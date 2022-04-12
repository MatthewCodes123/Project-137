status = "";
objects = [];

function setup() {
    canvas = createCanvas(460, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(460, 380);
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById("object_name").value

}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 460, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i > objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected"
            percent = floor(objects[i].confidence * 100);
            fill("red")
            nofill()
            stroke("red")
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            //Checking objects
            if (objects[i].label == object_name) {
                video.stop()
                objectDetector.detect(gotResult)
                document.getElementById("object_status").innerHTML = object_name + "Found";
                synth.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utterThis)
            }
            else{
                document.getElementById("object_status").innerHTML = object_name + "Not Found";
            }
        }
    }

}