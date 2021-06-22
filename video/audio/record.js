let audio = document.querySelector("#audio");
document.querySelector("#boton").addEventListener("click",function(ev){
    navigator.mediaDevices.getUserMedia({audio: true})
    .then(record)
    .catch(err => consonle.log(err));
})

let chunks = [];

function record(stream){
    audio.srcObject = stream;
    
    let mediaRecorder = new MediaRecorder(stream,{
        mimeType: 'audio/ogg'
    });

    mediaRecorder.start();

    mediaRecorder.ondataavailable = function(e){
        console.log(e.data);
        chunks.push(e.data);
    }

    mediaRecorder.onstop = function(){
        alert("Finalizó la grabación");

        let blob = new Blob(chunks,{type:"audio/ogg"});
        chunks = [];
        download(blob);
    }
    setTimeout(() => mediaRecorder.stop(),10000);
}

function download(blob){
    let link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download","audio_recorded.oga");
    link.style.display = "none";

    document.body.appendChild(link);

    link.click();

    link.remove();
}