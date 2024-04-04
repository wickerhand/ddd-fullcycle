import EventHandlerInterface from "../../@shared/event-handler.interface";
import AddressChangedEvent from "../address-changed.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<AddressChangedEvent> {
    handle(event: AddressChangedEvent): void {
        console.log(`The address of client: ${event.eventData.id} ${event.eventData.name} has been changed to: ${event.eventData.address}`);
    }
}