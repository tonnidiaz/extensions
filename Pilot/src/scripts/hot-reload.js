const filesInDirectory = dir =>
    new Promise(resolve =>
      dir.createReader().readEntries(entries =>
        Promise.all(
          entries
            .filter(e => e.name[0] !== ".")
            .map(e => (e.isDirectory ? filesInDirectory(e) : new Promise(res => e.file(res))))
        )
          .then(files => [].concat(...files))
          .then(resolve)
      )
    );
  
  const timestampForFilesInDirectory = dir =>
    filesInDirectory(dir).then(files => files.map(f => f.lastModified).join());
  
  const reload = () => {
    chrome.runtime.reload();
  };
  
  const watchChanges = (dir, lastTimestamp) => {
    timestampForFilesInDirectory(dir).then(timestamp => {
      if (!lastTimestamp || lastTimestamp === timestamp) {
        setTimeout(() => watchChanges(dir, timestamp), 1000); // Check every second
      } else {
        reload();
      }
    });
  };
  
  chrome.management.getSelf(self => {
    if (self.installType === "development") {
      const dir = chrome.runtime.getPackageDirectoryEntry();
      watchChanges(dir);
    }
  });
  