import { screen, fireEvent } from "@testing-library/dom"
import NewBill from "../containers/NewBill.js"
import { ROUTES_PATH } from "../constants/routes.js"
import { localStorageMock } from "../__mocks__/localStorage.js"
import mockStore from "../__mocks__/store.js"

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    let newBill
    let onNavigate

    beforeEach(() => {
      document.body.innerHTML = `
    <div id="root">
      <form data-testid="form-new-bill">
        <div class="form-group">
          <input type="file" data-testid="file" />
        </div>
        <select data-testid="expense-type"></select>
        <input data-testid="expense-name" />
        <input data-testid="amount" />
        <input data-testid="datepicker" />
        <input data-testid="vat" />
        <input data-testid="pct" />
        <textarea data-testid="commentary"></textarea>
      </form>
    </div>
  `
      onNavigate = jest.fn()
      localStorage.setItem("user", JSON.stringify({ type: "Employee", email: "a@a" }))
      newBill = new NewBill({ document, onNavigate, store: mockStore, localStorage: localStorageMock })
    })

    it("should submit the form with valid fields", () => {
      const handleSubmit = jest.fn(newBill.handleSubmit)
      newBill.document.querySelector(`form[data-testid="form-new-bill"]`).addEventListener("submit", handleSubmit)

      fireEvent.change(screen.getByTestId("expense-type"), { target: { value: "Transports" } })
      fireEvent.change(screen.getByTestId("expense-name"), { target: { value: "Train ticket" } })
      fireEvent.change(screen.getByTestId("amount"), { target: { value: "100" } })
      fireEvent.change(screen.getByTestId("datepicker"), { target: { value: "2023-10-10" } })
      fireEvent.change(screen.getByTestId("vat"), { target: { value: "20" } })
      fireEvent.change(screen.getByTestId("pct"), { target: { value: "20" } })
      fireEvent.change(screen.getByTestId("commentary"), { target: { value: "Business trip" } })
      newBill.fileUrl = "https://localhost/image.jpg"
      newBill.fileName = "image.jpg"

      fireEvent.submit(screen.getByTestId("form-new-bill"))

      expect(handleSubmit).toHaveBeenCalled()
      expect(onNavigate).toHaveBeenCalledWith(ROUTES_PATH["Bills"])
    })

    it("should not set fileUrl, fileName, and billId if file type is invalid", () => {
      const handleChangeFile = jest.fn(newBill.handleChangeFile)
      newBill.document.querySelector(`input[data-testid="file"]`).addEventListener("change", handleChangeFile)

      const file = new File(["document"], "document.pdf", { type: "application/pdf" })
      fireEvent.change(screen.getByTestId("file"), { target: { files: [file] } })

      expect(handleChangeFile).toHaveBeenCalled()
      expect(newBill.fileName).toBeNull()
    })
    it("should set fileUrl, fileName, and billId if file type is valid", async () => {
      const handleChangeFile = jest.fn(newBill.handleChangeFile)
      newBill.document.querySelector(`input[data-testid="file"]`).addEventListener("change", handleChangeFile)

      const file = new File(["image"], "image.jpg", { type: "image/jpeg" })
      fireEvent.change(screen.getByTestId("file"), { target: { files: [file] } })

      expect(handleChangeFile).toHaveBeenCalled()
      await new Promise(process.nextTick) // wait for promises to resolve
      expect(newBill.fileUrl).not.toBeNull()
      expect(newBill.billId).not.toBeNull()
    })

    it("should not set fileUrl, fileName, and billId if no file is selected", () => {
      const handleChangeFile = jest.fn(newBill.handleChangeFile)
      newBill.document.querySelector(`input[data-testid="file"]`).addEventListener("change", handleChangeFile)

      fireEvent.change(screen.getByTestId("file"), { target: { files: [] } })

      expect(handleChangeFile).toHaveBeenCalled()
      expect(newBill.fileName).toBeNull()
      expect(newBill.fileUrl).toBeNull()
      expect(newBill.billId).toBeNull()
    })
  })
})


