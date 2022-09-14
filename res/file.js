function saveStaticDataToFile(data) {
    var textToBLOB = new Blob([JSON.stringify(data)],
      { type: "text/plain;charset=utf-8" });
    let newLink = document.createElement("a");
    const sFileName='abc.json'
    newLink.download = sFileName;

    if (window.webkitURL != null) {
      newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    }
    else {
      newLink.href = window.URL.createObjectURL(textToBLOB);
      newLink.style.display = "none";
      document.body.appendChild(newLink);
    }

    newLink.click();
  }


export {saveStaticDataToFile}