import { VctrApi } from "https://www.vectary.com/viewer-api/v1/api.js";

let vctrApi;

async function run() {
    console.log("Example script running..");

    function errHandler(err) {
        console.log("API error", err);
    }

    function vectorsDistance(v1, v2) {
        return Math.sqrt(
            Math.pow(v1[0] - v2[0], 2) +
            Math.pow(v1[1] - v2[1], 2) +
            Math.pow(v1[2] - v2[2], 2));
    }

    async function onReady() {
        console.log("API ready..");

        const startPosition = [-0.35, 0.2, -0.2];
        const startRotation = [0, 0, 0];
        const origin = [0, 0.2, 0];

        try {
            console.log(await vctrApi.getObjects());
            await vctrApi.setVisibility(["Smoke"], false);
            await vctrApi.setPositionAbsolute("Rocket", startPosition);
            await vctrApi.setRotationAbsolute("Rocket", startRotation);
        } catch (e) {
            errHandler(e);
        }

        const r = vectorsDistance(startPosition, origin);

        const runAnimation = () => {
            VctrApi.Utils.animate(
                5000,
                animationDelta => animationDelta,
                animationDelta => {
                    const theta = 2 * Math.PI * animationDelta;
                    const posX = r * Math.cos(theta);
                    const posZ = r * Math.sin(theta);

                    vctrApi.setPositionAbsolute("Rocket", [origin[0] + posX, origin[1] + 0, origin[2] + posZ]);
                    vctrApi.setRotationAbsolute("Rocket", [0, -360 * animationDelta, 0]);

                    vctrApi.setRotationRelative("Space_Base", [0, 0, 0.1]);
                },
                () => {
                    console.log("Full circle");
                    runAnimation();
                }
            )
        };

        runAnimation();
    }

    vctrApi = new VctrApi("test", errHandler);
    try {
        await vctrApi.init();
    } catch (e) {
        errHandler(e);
    }

    onReady();
}

run();
