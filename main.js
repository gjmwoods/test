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
          download("hello.txt",aggregateTemplate);

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

var aggregateTemplate=`package <REPLACE_WITH_PACKAGE>; \n
\n
import org.axonframework.commandhandling.CommandHandler;\n
import org.axonframework.eventsourcing.EventSourcingHandler;\n
import org.axonframework.modelling.command.AggregateIdentifier;\n
import org.axonframework.spring.stereotype.Aggregate;\n
\n
import static org.axonframework.modelling.command.AggregateLifecycle.apply;\n
\n
@Aggregate\n
public class <REPLACE_WITH_AGGREGATE_NAME> { \n
\n
    @AggregateIdentifier\n
    private String id;\n
\n
    public <REPLACE_WITH_AGGREGATE_NAME>() {\n
        log.debug("empty constructor invoked");\n
    }\n
\n
    @CommandHandler\n
    public GiftCard(IssueCmd cmd) {\n
      //todo implement logic\n
    }\n
\n
    @EventSourcingHandler\n
    public void on(IssuedEvt evt) {\n
\n
    }\n
}
`
