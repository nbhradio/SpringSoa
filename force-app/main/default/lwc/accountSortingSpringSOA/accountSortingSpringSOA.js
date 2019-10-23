import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountSortingController.getAccounts';

const columns = [
    {
        label: 'Name',
        fieldName: 'Name',
        sortable: "true"
    }, {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone',
        sortable: "true"
    }, {
        label: 'CreatedDate',
        fieldName: 'CreatedDate',
        type: 'date'
    },
];

export default class AccountSortingSpringSOA extends LightningElement {
    @track data;
    @track columns = columns;
    @track sortBy;
    @track sortDirection;

    // retrieving the data using wire service
    @wire(getAccounts)
    contacts(result) {
        if (result.data) {
            this.data = result.data;
            this.error = undefined;

        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }
    }

    handleSortdata(event) {
        // field name
        this.sortBy = event.detail.fieldName;

        // sort direction
        this.sortDirection = event.detail.sortDirection;

        // calling sortdata function to sort the data based on direction and selected field
        this.sortData(event.detail.fieldName, event.detail.sortDirection);
    }

    sortData(fieldname, direction) {
        // serialize the data before calling sort function
        let parseData = JSON.parse(JSON.stringify(this.data));

        // Return the value stored in the field
        let keyValue = (a) => {
            return a[fieldname];
        };

        // cheking reverse direction 
        let isReverse = direction === 'asc' ? 1: -1;

        // sorting data 
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';

            // sorting values based on direction
            return isReverse * ((x > y) - (y > x));
        });

        // set the sorted data to data table data
        this.data = parseData;

    }

}