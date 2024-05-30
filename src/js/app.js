const prescriptionMeds = [];
const nonPrescriptionMeds = [];

// SELECTING THE ELEMENTS FROM THE DOM
const medForm = document.querySelector(".medForm");

const product = document.querySelector(".product");
const manufacturer = document.querySelector(".manufacturer");
const prescriptionSelect = document.querySelector(".prescriptionSelect");
const expirationDate = document.querySelector(".expirationDate");
const quantity = document.querySelector(".quantity");
const productId = document.querySelector(".productId");
const booksUl = document.querySelector('.prescription-meds-list');
const audioBooksUl = document.querySelector('.non-prescription-meds-list');
const MedForm = document.querySelector('.medForm');

const displayPrescriptionMedsContainer = document.querySelector(
  ".display-prescription-meds"
);
const displayNonPrescriptionMedsContainer = document.querySelector(
  ".display-non-prescription-meds"
);

const renderPhysicalBooksButton = document.querySelector('.render-prescription-meds-button');
const renderAudioBooksButton = document.querySelector('.render-non-prescription-meds-button');

// ADDING THE EVENT LISTENERS


MedForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let newBook;
  if (prescriptionSelect.value === "prescription") {
    newBook = new Book(
      product.value,
      manufacturer.value,
      prescriptionSelect.value,
      expirationDate.value,
      quantity.value,
      productId.value
    );
  } else {
    newBook = new AudioBook(
        product.value,
        manufacturer.value,
        prescriptionSelect.value,
        expirationDate.value,
        quantity.value,
        productId.value
    );
  }
  Book.addBook(newBook);
  medForm.reset();
  console.log(newBook);
  console.log(prescriptionMeds);
  console.log(nonPrescriptionMeds);
});


renderPhysicalBooksButton.addEventListener('click', ()=>{
    UI.activeTab = 'prescription';
    UI.renderBooks(Book)
})
renderAudioBooksButton.addEventListener('click', ()=>{
    UI.activeTab = 'non-prescription';
    UI.renderAudioBooks (AudioBook)
})

// DECLARING THE BOOK CLASS
class Book {
  constructor(product, manufacturer, prescriptionSelect, expirationDate, quantity, productId) {
    this.product = product;
    this.manufacturer = manufacturer;
    this.prescriptionSelect = prescriptionSelect;
    this.expirationDate = expirationDate;
    this.quantity = quantity;
    this.productId = productId;
    this.ID = Date.now();
  }
  static addBook(book) {
    if (book.format === "prescription") {
      prescriptionMeds.push(prescriptionMeds);
    } else {
      nonPrescriptionMeds.push(nonPrescriptionMeds);
    }
  }

  //DELETE METHOD
  static deleteBook(id, booksArray){
    const index = booksArray.findIndex(book => book.ID.toString() === id.toString());
    if(index !== -1){
        booksArray.splice(index, 1);
        if(UI.activeTab === 'prescription'){
            UI.renderBooks(prescriptionMeds)
        } else{
            UI.renderAudioBooks(nonPrescriptionMeds)
        }
    }
  }
}

// DECLARING THE AUDIOBOOK CLASS
class AudioBook extends Book {
  constructor(product, manufacturer, prescriptionSelect, expirationDate, quantity, productId) {
    super(product, manufacturer, prescriptionSelect, expirationDate, quantity, productId);
    this.ID = Date.now();
  }
}

// DECLARE THE UI CLASS
class UI {
  static activeTab = "prescription";
  static renderBooks(books) {

    displayNonPrescriptionMedsContainer.style.display ='none';
    displayPrescriptionMedsContainer.style.display = "block";
    booksUl.textContent = '';
    if (UI.activeTab === "Prescription") {

        prescriptionMeds.forEach((prescriptionMeds) => {
        const liRow = document.createElement('li');
        const renderedProduct = document.createElement('span');
        const renderedManufacturer = document.createElement('span');
        const renderedPrescriptionSelect = document.createElement('span');
        const renderedExpirationDate = document.createElement('span');
        const renderedQuantity = document.createElement('span');
        const renderedProductId = document.createElement('span');
        const deleteButtonContainer = document.createElement('span');
        const deleteButton = document.createElement('button');

        renderedProduct.textContent = prescriptionMeds.product;
        renderedManufacturer.textContent = prescriptionMeds.manufacturer;
        renderedPrescriptionSelect.textContent = prescriptionMeds.prescriptionSelect;
        renderedExpirationDate.textContent = prescriptionMeds.expirationDate;
        renderedQuantity.textContent = prescriptionMeds.quantity;
        renderedProductId.textContent = prescriptionMeds.productId;
        deleteButton.textContent = 'Delete ❌';

        liRow.classList.add('prescription-meds-row');
        deleteButton.classList.add('delete-button');

        liRow.dataset.id = prescriptionMeds.ID;

        booksUl.append(liRow);
        liRow.append(renderedProduct, renderedManufacturer, renderedPrescriptionSelect, renderedExpirationDate, renderedQuantity, renderedProductId, deleteButtonContainer);
        deleteButtonContainer.append(deleteButton);

        deleteButton.addEventListener('click', (e)=>{
            const rowID = e.currentTarget.parentElement.parentElement.dataset.id
            Book.deleteBook(rowID, prescriptionMeds)
        })

      });
    }
  }
//   ------------------------------------
  static renderAudioBooks(nonPrescriptionMeds){
    audioBooksUl.textContent = '';
    displayPrescriptionMedsContainer.style.display ='none'
    displayNonPrescriptionMedsContainer.style.display = 'block';

    if (UI.activeTab === 'non-prescription'){
        nonPrescriptionMeds.forEach( (nonPrescriptionMeds) => {
            const liRow = document.createElement('li');
            const renderedProduct = document.createElement('span');
            const renderedManufacturer = document.createElement('span');
            const renderedPrescriptionSelect = document.createElement('span');
            const renderedExpirationDate = document.createElement('span');
            const renderedQuantity = document.createElement('span');
            const renderedProductId = document.createElement('span');
            const deleteButtonContainer = document.createElement('span');
            const deleteButton = document.createElement('button');
    
            renderedProduct.textContent = prescriptionMeds.product;
            renderedManufacturer.textContent = prescriptionMeds.manufacturer;
            renderedPrescriptionSelect.textContent = prescriptionMeds.prescriptionSelect;
            renderedExpirationDate.textContent = prescriptionMeds.expirationDate;
            renderedQuantity.textContent = prescriptionMeds.quantity;
            renderedProductId.textContent = prescriptionMeds.productId;
            deleteButton.textContent = 'Delete ❌';

            liRow.dataset.id = nonPrescriptionMeds.ID;

            liRow.classList.add('non-prescription-meds-row');
            deleteButton.classList.add('delete-button');

            audioBooksUl.append(liRow);
            liRow.append(renderedProduct, renderedManufacturer, renderedPrescriptionSelect, renderedExpirationDate, renderedQuantity, renderedProductId, deleteButtonContainer);
            deleteButtonContainer.append(deleteButton)


            deleteButton.addEventListener('click', (e)=>{
                const rowID = e.currentTarget.parentElement.parentElement.dataset.id
                Book.deleteBook(rowID, nonPrescriptionMeds)
            }) 
        });
    }
  }
}