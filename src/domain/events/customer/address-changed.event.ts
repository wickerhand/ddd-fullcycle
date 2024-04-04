import EventInterface from "../@shared/event.interface";

export default class AddressChangedEvent implements EventInterface {
    dataTimeOccured: Date;
    eventData: any;

    constructor(customer: any) {
        this.dataTimeOccured = new Date();
        this.eventData = customer;
    }
}