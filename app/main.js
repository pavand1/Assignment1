console.log("main.js file loaded !");
// Code goes here
var app = angular.module('myApp', []);

app.controller('PosController', function ($scope) {
	//JSON for pizzas which will evantually be server data when connected to the database
    $scope.pizza = [{
        id: 0,
        name: "Margarita",
        price: "149",
    },
    {
        id: 1,
        name: "Veggie Lover",
        price: "199",
    },
    {
        id: 2,
        name: "Meat Pesto",
        price: "249",
    },
    {
        id: 3,
        name: "peppy paneer",
        price: "449",
    },
    {
        id: 4,
        name: "chicken fry",
        price: "349",
    },
    {
        id: 5,
        name: "chicken roster",
        price: "349",
	},
	{
		id: 6,
		name: "BBQ chicken",
		price: "449",
	},
	{
		id: 7,
		name: "deluxe cheese",
		price: "249",
	},
	{
		id: 8,
		name: "chicken alfredo",
		price: "199"
	},
	{
		id: 9,
		name: "veg paradise",
		price: "199",
	},
];

    $scope.order = [];
    $scope.new = {};
    $scope.totOrders = 0;

    var url = window.location.protocol + "://" + window.location.host + "/" + window.location.pathname;
	/*
	 * Function: getDate
	 * Description: this function will calculate the current date
	 * Parameters: no parameters
	 * Return: will return the date formated string
	 * Author: Pavan Divekar
	 * Created on: 23-01-2018
	 */
    $scope.getDate = function () {
        var today = new Date();
        var mm = today.getMonth() + 1;
        var dd = today.getDate();
        var yyyy = today.getFullYear();

        var date = dd + "/" + mm + "/" + yyyy

        return date
    };
	/*
	 * Function: addToOrder
	 * Description: this function will add the order details in order array
	 * Parameters:
	 * 	item - pizza item selected by the user
	 * 	qty - number of pizza items selected by the user
	 * Return: will just update the scope property in form of order array
	 * Author: Pavan Divekar
	 * Created on: 23-01-2018
	 */
    $scope.addToOrder = function (item, qty) {
        var flag = 0;
        if ($scope.order.length > 0) {
            for (var i = 0; i < $scope.order.length; i++) {
                if (item.id === $scope.order[i].id) {
                    item.qty += qty;
                    flag = 1;
                    break;
                }
            }
            if (flag === 0) {
                item.qty = 1;
            }
            if (item.qty < 2) {
                $scope.order.push(item);
            }
        } else {
            item.qty = qty;
            $scope.order.push(item);
        }
    };
	/*
	 * Function: removeOneEntity
	 * Description: this function will remove the number of pizza item from the single pizza order
	 * Parameters:
	 * 	item - pizza item seleted to be removed from number of pizza
	 * Return: none
	 * Author: Pavan Divekar
	 * Created on: 23-01-2018
	 */
    $scope.removeOneEntity = function (item) {
        for (var i = 0; i < $scope.order.length; i++) {
            if (item.id === $scope.order[i].id) {
                item.qty -= 1;
                if (item.qty === 0) {
                    $scope.order.splice(i, 1);
                }
            }
        }
    };
	/*
	 * Function: removeItem
	 * Description: this function will remove the pizza item
	 * Parameters:
	 * 	item - pizza item to be removed from the order
	 * Return: will just update the order array in the scope
	 * Author: Pavan Divekar
	 * Created on: 23-01-2018
	 */
    $scope.removeItem = function (item) {
        for (var i = 0; i < $scope.order.length; i++) {
            if (item.id === $scope.order[i].id) {
                $scope.order.splice(i, 1);
            }
        }
    };
	/*
	 * Function: getTotal
	 * Description: this function will calculate total number of orders recieved
	 * Parameters:
	 * Return: integer which is total number of orders recieved
	 * Author: Pavan Divekar
	 * Created on: 23-01-2018
	 */
    $scope.getTotal = function () {
        var tot = 0;
        for (var i = 0; i < $scope.order.length; i++) {
            tot += ($scope.order[i].price * $scope.order[i].qty)
        }
        return tot;
    };

    $scope.clearOrder = function () {
        $scope.order = [];
	};
	/*
	 * Function: checkout
	 * Description: this function will gives the update on order of user
	 * Parameters:
	 * Return:
	 * Author: Pavan Divekar
	 * Created on: 23-01-2018
	 */

    $scope.checkout = function () {
		//for notifying the user that order is confirmed 
        alert($scope.getDate() + " - Order Number: " + ($scope.totOrders+1) + "\n\nOrder amount: INR " + $scope.getTotal().toFixed(2) + "\n\nPayment received. Thanks.");
        $scope.order = [];
        $scope.totOrders += 1;
    };

    
});
