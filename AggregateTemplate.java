package <REPLACE_WITH_PACKAGE>;

import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.spring.stereotype.Aggregate;

import java.lang.invoke.MethodHandles;

import static org.axonframework.modelling.command.AggregateLifecycle.apply;

@Aggregate
public class <REPLACE_WITH_AGGREGATE_NAME> {

    @AggregateIdentifier
    private String id;

    public <REPLACE_WITH_AGGREGATE_NAME>() {
        log.debug("empty constructor invoked");
    }

    @CommandHandler
    public GiftCard(IssueCmd cmd) {
      //todo implement logic
    }

    @EventSourcingHandler
    public void on(IssuedEvt evt) {

    }

}
