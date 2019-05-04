// The shaders are copied from https://github.com/bradley/Blotter/tree/master/build/materials.
// Since otherwise we need to have material scripts separately in HTML file, now each component can import
// these materials and update the shader.

export const channelSplitMaterial = BlotterInstance => {
  const shader = [
    BlotterInstance.Assets.Shaders.PI,
    BlotterInstance.Assets.Shaders.LineMath,
    BlotterInstance.Assets.Shaders.Random,

    'const int MAX_STEPS = 200;',

    '// Fix a floating point number to two decimal places',
    'float toFixedTwo(float f) {',
    '    return float(int(f * 100.0)) / 100.0;',
    '}',

    'vec2 motionBlurOffsets(vec2 fragCoord, float deg, float spread) {',

    '    // Setup',
    '    // -------------------------------',

    '    vec2 centerUv = vec2(0.5);',
    '    vec2 centerCoord = uResolution.xy * centerUv;',

    '    deg = toFixedTwo(deg);',
    '    float slope = normalizedSlope(slopeForDegrees(deg), uResolution.xy);',

    '    // Find offsets',
    '    // -------------------------------',

    '    vec2 k = offsetsForCoordAtDistanceOnSlope(spread, slope);',
    '    if (deg <= 90.0 || deg >= 270.0) {',
    '        k *= -1.0;',
    '    }',

    '    return k;',
    '}',

    'float noiseWithWidthAtUv(float width, vec2 uv) {',
    '    float noiseModifier = 1.0;',
    '    if (uAnimateNoise > 0.0) {',
    '        noiseModifier = sin(uGlobalTime);',
    '    }',

    '    vec2 noiseRowCol = floor((uv * uResolution.xy) / width);',
    '    vec2 noiseFragCoord = ((noiseRowCol * width) + (width / 2.0));',
    '    vec2 noiseUv = noiseFragCoord / uResolution.xy;',

    '    return random(noiseUv * noiseModifier) * 0.125;',
    '}',

    'vec4 motionBlur(vec2 uv, vec2 blurOffset, float maxOffset) {',
    '    float noiseWidth = 3.0;',
    '    float randNoise = noiseWithWidthAtUv(noiseWidth, uv);',

    '    vec4 result = textTexture(uv);',

    '    float maxStepsReached = 0.0;',

    '    // Note: Step by 2 to optimize performance. We conceal lossiness here via applied noise.',
    '    //   If you do want maximum fidelity, change `i += 2` to `i += 1` below.',
    '    for (int i = 1; i <= MAX_STEPS; i += 2) {',
    '        if (abs(float(i)) > maxOffset) { break; }',
    '        maxStepsReached += 1.0;',

    '        // Divide blurOffset by 2.0 so that motion blur starts half way behind itself',
    '        //   preventing blur from shoving samples in any direction',
    '        vec2 offset = (blurOffset / 2.0) - (blurOffset * (float(i) / maxOffset));',
    '        vec4 stepSample = textTexture(uv + (offset / uResolution.xy));',

    ,
    '        result += stepSample;',
    '    }',

    '    if (maxOffset >= 1.0) {',
    '        result /= maxStepsReached;',
    '        //result.a = pow(result.a, 2.0); // Apply logarithmic smoothing to alpha',
    '        result.a -= (randNoise * (1.0 - result.a)); // Apply noise to smoothed alpha',
    '    }',

    '    return result;',
    '}',

    'void mainImage( out vec4 mainImage, in vec2 fragCoord ) {',

    '    // Setup',
    '    // -------------------------------',

    '    vec2 uv = fragCoord.xy / uResolution.xy;',

    '    float offset = min(float(MAX_STEPS), uResolution.y * uOffset);',

    '    float slope = normalizedSlope(slopeForDegrees(uRotation), uResolution);',

    '    // We want the blur to be the full offset amount in each direction',
    '    //   and to adjust with our logarithmic adjustment made later, so multiply by 4',
    '    float adjustedOffset = offset;// * 4.0;',

    '    vec2 blurOffset = motionBlurOffsets(fragCoord, uRotation, adjustedOffset);',

    '    // Set Starting Points',
    '    // -------------------------------',

    '    vec2 rUv = uv;',
    '    vec2 gUv = uv;',
    '    vec2 bUv = uv;',

    '    vec2 k = offsetsForCoordAtDistanceOnSlope(offset, slope) / uResolution;',

    '    if (uRotation <= 90.0 || uRotation >= 270.0) {',
    '        rUv += k;',
    '        bUv -= k;',
    '    }',
    '    else {',
    '        rUv -= k;',
    '        bUv += k;',
    '    }',

    '    // Blur and Split Channels',
    '    // -------------------------------',

    '    vec4 resultR = vec4(0.0);',
    '    vec4 resultG = vec4(0.0);',
    '    vec4 resultB = vec4(0.0);',

    '    if (uApplyBlur > 0.0) {',
    '        resultR = motionBlur(rUv, blurOffset, adjustedOffset);',
    '        resultG = motionBlur(gUv, blurOffset, adjustedOffset);',
    '        resultB = motionBlur(bUv, blurOffset, adjustedOffset);',
    '    } else {',
    '        resultR = textTexture(rUv);',
    '        resultG = textTexture(gUv);',
    '        resultB = textTexture(bUv);',
    '    }',

    '    float a = resultR.a + resultG.a + resultB.a;',

    '    resultR = normalBlend(resultR, uBlendColor);',
    '    resultG = normalBlend(resultG, uBlendColor);',
    '    resultB = normalBlend(resultB, uBlendColor);',

    '    mainImage = vec4(resultR.r, resultG.g, resultB.b, a);',
    '}'
  ].join('\n');

  const uniforms = {
    uOffset: { type: '1f', value: 0.05 },
    uRotation: { type: '1f', value: 45.0 },
    uApplyBlur: { type: '1f', value: 1.0 },
    uAnimateNoise: { type: '1f', value: 1.0 }
  };

  return {
    shader,
    uniforms
  };
};

export const fliesMaterial = BlotterInstance => {
  const shader = [
    BlotterInstance.Assets.Shaders.Random,

    'vec2 random2(vec2 p) {',
    '    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);',
    '}',

    'float isParticle(out vec3 particleColor, vec2 fragCoord, float pointRadius, float pointCellWidth, float dodge, vec2 dodgePosition, float dodgeSpread, float speed) {    ',
    '    if (pointCellWidth == 0.0) { return 0.0; };',

    '    vec2 uv = fragCoord.xy / uResolution.xy;',

    '    float pointRadiusOfCell = pointRadius / pointCellWidth;',

    '    vec2 totalCellCount = uResolution.xy / pointCellWidth;',
    '    vec2 cellUv = uv * totalCellCount;',

    '    // Tile the space',
    '    vec2 iUv = floor(cellUv);',
    '    vec2 fUv = fract(cellUv);',

    '    float minDist = 1.0;  // minimun distance',

    '    vec4 baseSample = textTexture(cellUv);',
    '    float maxWeight = 0.0;',
    '    particleColor = baseSample.rgb;',

    '    for (int y= -1; y <= 1; y++) {',
    '        for (int x= -1; x <= 1; x++) {',
    '            // Neighbor place in the grid',
    '            vec2 neighbor = vec2(float(x), float(y));',

    '            // Random position from current + neighbor place in the grid',
    '            vec2 point = random2(iUv + neighbor);',

    "            // Get cell weighting from cell's center alpha",
    '            vec2 cellRowCol = floor(fragCoord / pointCellWidth) + neighbor;',
    '            vec2 cellFragCoord = ((cellRowCol * pointCellWidth) + (pointCellWidth / 2.0));',
    '            vec4 cellSample = textTexture(cellFragCoord / uResolution.xy);',
    '            float cellWeight = cellSample.a;',

    '            if (cellWeight < 1.0) {',
    '               // If the cell is not fully within our text, we should disregard it',
    '               continue;',
    '            }',

    '            maxWeight = max(maxWeight, cellWeight);',
    '            if (cellWeight == maxWeight) {',
    '                particleColor = cellSample.rgb;',
    '            }',

    '            float distanceFromDodge = distance(dodgePosition * uResolution.xy, cellFragCoord) / uResolution.y;',
    '            distanceFromDodge = 1.0 - smoothstep(0.0, dodgeSpread, distanceFromDodge);',

    '            // Apply weighting to noise and dodge if dodge is set to 1.0',
    '            cellWeight = step(cellWeight, random(cellRowCol)) + (distanceFromDodge * dodge);',

    '            // Animate the point',
    '            point = 0.5 + 0.75 * sin((uGlobalTime * speed) + 6.2831 * point);',

    '            // Vector between the pixel and the point',
    '            vec2 diff = neighbor + point - fUv;',

    '            // Distance to the point',
    '            float dist = length(diff);',
    '            dist += cellWeight; // Effectively remove point',

    '            // Keep the closer distance',
    '            minDist = min(minDist, dist);',
    '        }',
    '    }',

    '    float pointEasing = pointRadiusOfCell - (1.0 / pointCellWidth);',

    '    float isParticle = 1.0 - smoothstep(pointEasing, pointRadiusOfCell, minDist);',

    '    return isParticle;',
    '}',

    'void mainImage( out vec4 mainImage, in vec2 fragCoord ) {',
    '    vec2 uv = fragCoord.xy / uResolution.xy;',

    '    // Convert uPointCellWidth to pixels, keeping it between 1 and the total y resolution of the text',
    '    // Note: floor uPointCellWidth here so that we dont have half pixel widths on retina displays',
    '    float pointCellWidth = floor(max(0.0, min(1.0, uPointCellWidth) * uResolution.y));',

    '    // Ensure uPointRadius allow points to exceed the width of their cells',
    '    float pointRadius = uPointRadius * 0.8;',
    '    pointRadius = min(pointRadius * pointCellWidth, pointCellWidth);',

    '    float dodge = ceil(uDodge);',

    '    vec3 outColor = vec3(0.0);',
    '    float point = isParticle(outColor, fragCoord, pointRadius, pointCellWidth, dodge, uDodgePosition, uDodgeSpread, uSpeed);',

    '    mainImage = vec4(outColor, point);',
    '}'
  ].join('\n');

  const uniforms = {
    uPointCellWidth: { type: '1f', value: 0.04 },
    uPointRadius: { type: '1f', value: 0.75 },
    uDodge: { type: '1f', value: 0.0 },
    uDodgePosition: { type: '2f', value: [0.5, 0.5] },
    uDodgeSpread: { type: '1f', value: 0.25 },
    uSpeed: { type: '1f', value: 1.0 }
  };

  return {
    shader,
    uniforms
  };
};

export const liquidDistortionMaterial = BlotterInstance => {
  const shader = [
    BlotterInstance.Assets.Shaders.Noise3D,

    'void mainImage( out vec4 mainImage, in vec2 fragCoord )',
    '{',
    '    // Setup ========================================================================',

    '    vec2 uv = fragCoord.xy / uResolution.xy;',
    '    float z = uSeed + uGlobalTime * uSpeed;',

    '    uv += snoise(vec3(uv, z)) * uVolatility;',

    '    mainImage = textTexture(uv);',

    '}'
  ].join('\n');

  const uniforms = {
    uSpeed: { type: '1f', value: 1.0 },
    uVolatility: { type: '1f', value: 0.15 },
    uSeed: { type: '1f', value: 0.1 }
  };

  return {
    shader,
    uniforms
  };
};

export const distortionText = BlotterInstance => {
  const shader = [
    BlotterInstance.Assets.Shaders.PI,
    BlotterInstance.Assets.Shaders.LineMath,
    BlotterInstance.Assets.Shaders.Noise,

    '// Fix a floating point number to two decimal places',
    'float toFixedTwo(float f) {',
    '    return float(int(f * 100.0)) / 100.0;',
    '}',

    '// Via: http://www.iquilezles.org/www/articles/functions/functions.htm',
    'float impulse(float k, float x) {',
    '    float h = k * x;',
    '    return h * exp(1.0 - h);',
    '}',

    'vec2 waveOffset(vec2 fragCoord, float sineDistortSpread, float sineDistortCycleCount, float sineDistortAmplitude, float noiseDistortVolatility, float noiseDistortAmplitude, vec2 distortPosition, float deg, float speed) {',

    '    // Setup',
    '    // -------------------------------',

    '    deg = toFixedTwo(deg);',

    '    float centerDistance = 0.5;',
    '    vec2 centerUv = vec2(centerDistance);',
    '    vec2 centerCoord = uResolution.xy * centerUv;',

    '    float changeOverTime = uGlobalTime * speed;',

    '    float slope = normalizedSlope(slopeForDegrees(deg), uResolution.xy);',
    '    float perpendicularDeg = mod(deg + 90.0, 360.0); // Offset angle by 90.0, but keep it from exceeding 360.0',
    '    float perpendicularSlope = normalizedSlope(slopeForDegrees(perpendicularDeg), uResolution.xy);',

    '    // Find intersects for line with edges of viewport',
    '    // -------------------------------',

    '    vec2 edgeIntersectA = vec2(0.0);',
    '    vec2 edgeIntersectB = vec2(0.0);',
    '    intersectsOnRectForLine(edgeIntersectA, edgeIntersectB, vec2(0.0), uResolution.xy, centerCoord, slope);',
    '    float crossSectionLength = distance(edgeIntersectA, edgeIntersectB);',

    '    // Find the threshold for degrees at which our intersectsOnRectForLine function would flip',
    '    //   intersects A and B because of the order in which it finds them. This is the angle at which',
    '    //   the y coordinate for the hypotenuse of a right triangle whose oposite adjacent edge runs from',
    '    //   vec2(0.0, centerCoord.y) to centerCoord and whose opposite edge runs from vec2(0.0, centerCoord.y) to',
    '    //   vec2(0.0, uResolution.y) exceeeds uResolution.y',
    '    float thresholdDegA = atan(centerCoord.y / centerCoord.x) * (180.0 / PI);',
    '    float thresholdDegB = mod(thresholdDegA + 180.0, 360.0);',

    '    vec2 edgeIntersect = vec2(0.0);',
    '    if (deg < thresholdDegA || deg > thresholdDegB) {',
    '        edgeIntersect = edgeIntersectA;',
    '    } else {',
    '        edgeIntersect = edgeIntersectB;',
    '    }',

    '    vec2 perpendicularIntersectA = vec2(0.0);',
    '    vec2 perpendicularIntersectB = vec2(0.0);',
    '    intersectsOnRectForLine(perpendicularIntersectA, perpendicularIntersectB, vec2(0.0), uResolution.xy, centerCoord, perpendicularSlope); ',
    '    float perpendicularLength = distance(perpendicularIntersectA, perpendicularIntersectA);',

    '    vec2 coordLineIntersect = vec2(0.0);',
    '    lineLineIntersection(coordLineIntersect, centerCoord, slope, fragCoord, perpendicularSlope);',

    '    // Define placement for distortion ',
    '    // -------------------------------',

    '    vec2 distortPositionIntersect = vec2(0.0);',
    '    lineLineIntersection(distortPositionIntersect, distortPosition * uResolution.xy, perpendicularSlope, edgeIntersect, slope);',
    '    float distortDistanceFromEdge = (distance(edgeIntersect, distortPositionIntersect) / crossSectionLength);// + sineDistortSpread;',

    '    float uvDistanceFromDistort = distance(edgeIntersect, coordLineIntersect) / crossSectionLength;',
    '    float noiseDistortVarianceAdjuster = uvDistanceFromDistort + changeOverTime;',
    '    uvDistanceFromDistort += -centerDistance + distortDistanceFromEdge + changeOverTime;',
    '    uvDistanceFromDistort = mod(uvDistanceFromDistort, 1.0); // For sine, keep distance between 0.0 and 1.0',

    '    // Define sine distortion ',
    '    // -------------------------------',

    '    float minThreshold = centerDistance - sineDistortSpread;',
    '    float maxThreshold = centerDistance + sineDistortSpread;',

    '    uvDistanceFromDistort = clamp(((uvDistanceFromDistort - minThreshold)/(maxThreshold - minThreshold)), 0.0, 1.0);',
    '    if (sineDistortSpread < 0.5) {',
    '        // Add smoother decay to sin distort when it isnt taking up the full viewport.',
    '        uvDistanceFromDistort = impulse(uvDistanceFromDistort, uvDistanceFromDistort);',
    '    }',

    '    float sineDistortion = sin(uvDistanceFromDistort * PI * sineDistortCycleCount) * sineDistortAmplitude;',

    '    // Define noise distortion ',
    '    // -------------------------------',

    '    float noiseDistortion = noise(noiseDistortVolatility * noiseDistortVarianceAdjuster) * noiseDistortAmplitude;',
    '    if (noiseDistortVolatility > 0.0) {',
    '        noiseDistortion -= noiseDistortAmplitude / 2.0; // Adjust primary distort so that it distorts in two directions.',
    '    }',
    '    noiseDistortion *= (sineDistortion > 0.0 ? 1.0 : -1.0); // Adjust primary distort to account for sin variance.',

    '    // Combine distortions to find UV offsets ',
    '    // -------------------------------',

    '    vec2 kV = offsetsForCoordAtDistanceOnSlope(sineDistortion + noiseDistortion, perpendicularSlope);',
    '    if (deg <= 0.0 || deg >= 180.0) {',
    '        kV *= -1.0;',
    '    }',

    '    return kV;',
    '}',

    'void mainImage( out vec4 mainImage, in vec2 fragCoord )',
    '{',
    '    // Setup',
    '    // -------------------------------',

    '    vec2 uv = fragCoord.xy / uResolution.xy;',

    '    // Minor hacks to ensure our waves start horizontal and animating in a downward direction by default.',
    '    uRotation = mod(uRotation + 270.0, 360.0);',
    '    uDistortPosition.y = 1.0 - uDistortPosition.y;',

    '    // Distortion',
    '    // -------------------------------',

    '    vec2 offset = waveOffset(fragCoord, uSineDistortSpread, uSineDistortCycleCount, uSineDistortAmplitude, uNoiseDistortVolatility, uNoiseDistortAmplitude, uDistortPosition, uRotation, uSpeed);',

    '    mainImage = textTexture(uv + offset);',
    '}'
  ].join('\n');

  const uniforms = {
    uSineDistortSpread: { type: '1f', value: 0.05 },
    uSineDistortCycleCount: { type: '1f', value: 2.0 },
    uSineDistortAmplitude: { type: '1f', value: 0.25 },
    uNoiseDistortVolatility: { type: '1f', value: 20.0 },
    uNoiseDistortAmplitude: { type: '1f', value: 0.01 },
    uDistortPosition: { type: '2f', value: [0.5, 0.5] },
    uRotation: { type: '1f', value: 170.0 },
    uSpeed: { type: '1f', value: 0.08 }
  };

  return {
    shader,
    uniforms
  };
};
