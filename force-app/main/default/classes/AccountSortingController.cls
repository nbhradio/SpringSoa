public with sharing class AccountSortingController {
    public AccountSortingController() {

    }

    @AuraEnabled(Cacheable = true)
    public static List<Account> getAccounts(){
        return [SELECT Id, Name, Phone,CreatedDate  FROM Account ORDER BY CreatedDate desc limit 10];
    }
}
