'use strict';

/* Variable declarations. */
// Main.
let main;

// Camera.
let cameraListHandle = document.getElementById('device-list');
let cameraHandle = document.getElementById('camera');

let cameraList = getCameraList();
let cameraSelected;

// Canvas.
let width, height;

let converterHandle = document.getElementById('converter');
let converterContext = converterHandle.getContext('2d');

let comparatorHandle = document.getElementById('comparator');
let comparatorContext = converterHandle.getContext('2d');

let maskerHandle = document.getElementById('masker');
let maskerContext = converterHandle.getContext('2d');

let compositorHandle = document.getElementById('compositor');
let compositorContext = converterHandle.getContext('2d');

//let streamHandle = document.getElementById('stream');
//let streamContext = converterHandle.getContext('2d');

let referenceHandle = document.getElementById('reference');
let referenceContext = referenceHandle.getContext('2d');

// Reference.
let referenceButton = document.getElementById('take-reference');
let referenceDelay = 3;

// Begin main.
let beginMain = function () {
    main = main || requestAnimationFrame(loop);
}

// Main.
let loop = function () {
    main = requestAnimationFrame(loop);

    converterContext.drawImage(cameraHandle, 0, 0, width, height);
}

/* Ready to go. */
$(function() {
    // Camera.
    if (cameraList.length > 0) {
        for (let i = 0; i < cameraList.length; i++) {
            let option = document.createElement('option');

            option.value = cameraList[i].deviceId;
            option.text = cameraList[i].label || 'Camera ' + (i + 1);

            cameraListHandle.add(option);
        }

        cameraSelected = cameraListHandle.options[cameraListHandle.selectedIndex].value;
        activateCamera(cameraSelected, cameraHandle);
    }

    cameraListHandle.addEventListener('input', function() {
        cameraSelected = cameraListHandle.options[cameraListHandle.selectedIndex].value;
        activateCamera(cameraSelected, cameraHandle);
    });

    // Reference.
    referenceButton.addEventListener('click', function() {
        let count = referenceDelay;

        let referenceCountdown = setInterval(function () {
            if (count === 0) {
                clearInterval(referenceCountdown);
                referenceContext.drawImage(converterHandle, 0, 0, width, height);
            } else {
                count--;
            }
        }, 1000);
    });

    // Main.
    cameraHandle.addEventListener('loadedmetadata', function() {
        width = cameraHandle.videoWidth;
        height = cameraHandle.videoHeight;

        converterHandle.width = width, converterHandle.height = height;
        comparatorHandle.width = width, comparatorHandle.height = height;
        maskerHandle.width = width, maskerHandle.height = height;
        compositorHandle.width = width, compositorHandle.height = height;
        //streamHandle.width = width, streamHandle.height = height;
        referenceHandle.width = width, referenceHandle.height = height;

        converterContext.drawImage(cameraHandle, 0, 0, width, height);

        beginMain();
    });
});