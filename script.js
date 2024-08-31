function convertToSRT() {
    let text = document.getElementById('text-input').value;
    let lines = text.split('\n');
    let srtContent = '';
    let counter = 1;
    let startTime = 0;

    lines.forEach((line) => {
        if (line.trim() !== '') {
            let endTime = startTime + 4; // duração padrão de 4 segundos por linha
            srtContent += `${counter}\n`;
            srtContent += `00:00:${formatTime(startTime)} --> 00:00:${formatTime(endTime)}\n`;
            srtContent += `${line.trim()}\n\n`;
            startTime = endTime;
            counter++;
        }
    });

    let blob = new Blob([srtContent], { type: 'text/srt' });
    let url = URL.createObjectURL(blob);

    let downloadLink = document.getElementById('download-link');
    downloadLink.href = url;
    downloadLink.download = 'subtitles.srt';
    downloadLink.style.display = 'block';
    downloadLink.textContent = 'Download SRT';
}

function formatTime(seconds) {
    return seconds.toString().padStart(2, '0') + ',000';
}
