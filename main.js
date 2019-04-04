var fs = require("fs");

rtb.onReady(() => {
  rtb.initialize({
    extensionPoints: {
      bottomBar: {
        title: 'Generate Axon Sources',
        svgIcon: '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
        positionPriority: 1,
        onClick: async () => {

          // Get selected widgets
          let selectedWidgets = await rtb.board.selection.get()

          // Filter stickers from selected widgets
          let stickers = selectedWidgets.filter(widget => widget.type === 'STICKER')

          // Delete selected stickers
          await rtb.board.widgets.deleteById(stickers.map(sticker => sticker.id))

          // Create shapes from selected stickers
          await rtb.board.widgets.create(stickers.map(sticker => ({
            type: 'shape',
            text: sticker.text,
            x: sticker.x,
            y: sticker.y,
            width: sticker.bounds.width,
            height: sticker.bounds.height,
          })))

          // Start file download.
          download("hello.txt","This is the content of my file :)");

          // Show success message
          rtb.showNotification('Axon Sources have been downloaded')
        }
      }
    }
  })
})


function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

aggregateTemplate=fs.readFileSync("./AggregateTemplate.java");
