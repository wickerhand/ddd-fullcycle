import EventDispatcher  from "../@shared/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLog1Handler from "./handlers/EnviaConsoleLog1Handler";
import SendConsoleLog2Handler from "./handlers/EnviaConsoleLog2Handler";
import Customer from "../../entities/customer";

describe('CustomerCreatedEvent tests', () => {
    it("should notify the event handlers of the creation of a product", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler1 = new SendConsoleLog1Handler();
		const eventHandler2 = new SendConsoleLog2Handler();

		const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
		const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

		eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
		eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

		expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);

        const customer = new Customer("123", "John Doe");

		const customerCreatedEvent = new CustomerCreatedEvent(customer);

		eventDispatcher.notify(customerCreatedEvent);

		expect(spyEventHandler1).toHaveBeenCalled();
		expect(spyEventHandler2).toHaveBeenCalled();
	});
});