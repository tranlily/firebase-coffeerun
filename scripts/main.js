(function (window) {
  'use strict';

  var FORM_SELECTOR = '[data-coffee-order="form"]';   
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';

  var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';

  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var CheckList = App.CheckList;
  var Validation = App.Validation;
  var RemoteDataStore = App.RemoteDataStore;
  
  var remoteDS = new RemoteDataStore();
  var myTruck = new Truck('ncc-1701', remoteDS);
  window.myTruck = myTruck;
  var formHandler = new FormHandler(FORM_SELECTOR);
  var checkList = new CheckList(CHECKLIST_SELECTOR);

  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

  formHandler.addSubmitHandler(function (data) {
      myTruck.createOrder.call(myTruck, data);
      checkList.addRow.call(checkList, data);
  });  

  formHandler.addInputHandler(Validation.isCompanyEmail);
  
}) (window);