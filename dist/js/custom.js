const factorNumber = document.getElementById("factorNumber");
const phoneSerial = document.getElementById("phoneSerial");
const phoneName = document.getElementById("phoneName");
const purchasePrice = document.getElementById("purchasePrice");
const purchaseDate = document.getElementById("purchaseDate");
const Seller = document.getElementById("Seller");
const phoneNumber = document.getElementById("phoneNumber");
const expenses = document.getElementById("expenses");
const registerPrice = document.getElementById("registerPrice");
const totalPrice = document.getElementById("totalPrice");
const description = document.getElementById("description");

// btn
const btnAddBuy = document.getElementById("btn-AddBuy");

let number = 1;
factorNumber.value = number;
phoneSerial.focus();
btnAddBuy.addEventListener("click", () => {
  if (
    factorNumber.value === "" ||
    phoneSerial.value === "" ||
    phoneName.value === "" ||
    purchasePrice.value === "" ||
    purchaseDate.value === "" ||
    Seller.value === "" ||
    phoneNumber.value === "" ||
    expenses.value === "" ||
    totalPrice.value === ""
  ) {
    alert("یک سری از فیلدها پر نشده لطفا با دقت پر کنید");
    return;
  }
  var request = indexedDB.open("myDatabase", 1);
  request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("myObjectStore", { keyPath: "id" });
  };

  // Handle successful database opening
  request.onsuccess = function (event) {
    var db = event.target.result;

    // Perform operations within a transaction
    var transaction = db.transaction(["myObjectStore"], "readwrite");
    var objectStore = transaction.objectStore("myObjectStore");

    // Add data to the object store
    objectStore.add({ id: 1, name: "John Doe", age: 30 });

    // Retrieve data by key
    var getRequest = objectStore.get(1);

    getRequest.onsuccess = function (event) {
      var data = getRequest.result;
      console.log(data); // Output: { id: 1, name: 'John Doe', age: 30 }
    };

    // Update data
    var updateRequest = objectStore.put({ id: 1, name: "Jane Doe", age: 35 });

    updateRequest.onsuccess = function (event) {
      console.log("Data updated successfully");
    };

    // Delete data
    var deleteRequest = objectStore.delete(1);

    deleteRequest.onsuccess = function (event) {
      console.log("Data deleted successfully");
    };

    // Close the transaction when done
    transaction.oncomplete = function (event) {
      console.log("Transaction completed");
    };

    // Close the database when done
    db.close();
  };

  // Handle errors during database opening
  request.onerror = function (event) {
    console.error("Error opening database:", event.target.error);
  };
});
