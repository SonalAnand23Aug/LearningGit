﻿(function () {
	var mylocal = "http://localhost:3000/";
	var dlocal = "http://9.193.21.28:3000/";
	var Bluemix = "appnodejscloudant1.au-syd.mybluemix.net/";
    var accountService = function ($http, $q, $log) {
        var cachedAccounts;
     	//alert("Inside Sevice");
        var accounts = function () {
            if (cachedAccounts)
                return $q.when(cachedAccounts);
          //	alert("Inside calling URL"); //appnodejscloudant1.au-syd.mybluemix.net/api/getByType?type=account
            return $http.get("http://localhost:3000/api/getByType?type=account") //http://9.193.21.28:3000/api/getByType?type=account 
                        .then(function (serviceResp) {
                         	//alert("After hit");
                            cachedAccounts = serviceResp.data;
                            //alert("DATA ::"+serviceResp.data)
                            console.log(serviceResp.data);
                            return serviceResp.data;
                        });
        };
        
        
       var singleAccount = function (id) {
    	   alert("Inside Single Account New URL ::http://localhost:3000/api/getAccountbyId?id="+id)
            return $http.get("http://localhost:3000/api/getAccountbyId?id="+id) ///api/getByid  //"http://localhost:3000/api/getByType?type=account"
                        .then(function (serviceResp) {
                            return serviceResp.data;
                            //alert("Single acc response in service ::"+serviceResp.data)
                        });
        };
		
        
  
        var insertAccount = function (account) {
            return $http.post("http://localhost:3000/api/createAccount", account) //appnodejscloudant1.au-syd.mybluemix.net/api/createAccount
            .then(function (result)
            { //http://9.193.21.28/api/createAccount
            	//alert("Inside Sevice"+account);
                $log.info("Insert Successful");
                debugger;
                cachedAccounts = null;
                //alert("result "+result.data);
                return result;
            });
        };

        var modifyAccount = function (account) { //appnodejscloudant1.au-syd.mybluemix.net//api/updateAccount 
            return $http.put("http://localhost:3000/api/updateAccount", account)
            .then(function (result) {
                $log.info("Update Successful");
                cachedAccounts = null;
                alert('Update Success!!')
                return;
            });
        };

        var deleteAccount = function (account) {
            return $http.delete("http://localhost:3000/api/delete?id="+account._id)
            .then(function (result) {
                $log.info("Delete Successful");
                cachedAccounts = null;
                //alert('Delete Success!!')
                return result.data;
            });
        };

        return {
            accounts: accounts,
            singleAccount: singleAccount,
            insertAccount: insertAccount,
            modifyAccount: modifyAccount,
            deleteAccount: deleteAccount
        };
    };

    var module = angular.module("ProjectInventory");

    module.factory("accountService", ["$http", "$q", "$log", accountService]);
}());