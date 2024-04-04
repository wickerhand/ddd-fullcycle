import Address from "../../entities/adress";
import Customer from "../../entities/customer";
import EventDispatcher from "../@shared/event-dispatcher";
import EnviaConsoleLogHandler from "./handlers/EnviaConsoleLogHandler";
import AddressChangedEvent from "./address-changed.event";

describe('AddressChangedEvent tests', () => {
    it("should notify the event handlers of the change of a customer's address", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();

        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("AddressChangedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["AddressChangedEvent"].length).toBe(1);

        const customer = new Customer("123", "John Doe");
        const address = new Address("123 Main St", 12345, "233543", "Springfield");
        customer.changeAddress(address);

        const addressChangedEvent = new AddressChangedEvent(customer);

        eventDispatcher.notify(addressChangedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });
});