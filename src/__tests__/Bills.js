/**
 * @jest-environment jsdom
 */

import {screen} from "@testing-library/dom"
import BillsUI from "../views/BillsUI.js"
import {bills} from "../fixtures/bills.js"
import {ROUTES, ROUTES_PATH} from "../constants/routes.js";
import {localStorageMock} from "../__mocks__/localStorage.js";

import Bills from "../containers/Bills.js";
import userEvent from "@testing-library/user-event";

describe("Given I am connected as an employee", () => {
    describe("When I am on Bills Page", () => {
        test("Then icon eye should dispatch event on click", async () => {

            const onNavigate = jest.fn((pathname) => {
                document.body.innerHTML = ROUTES({pathname})
            })

            Object.defineProperty(window, 'localStorage', {value: localStorageMock})
            window.localStorage.setItem('user', JSON.stringify({
                type: 'Employee'
            }))

            document.body.innerHTML = BillsUI({data: bills})

            const billsContainer = new Bills({
                document,
                onNavigate,
                store: null,
                localStorage: window.localStorage
            })

            $.fn.width = () => 500
            $.fn.modal = jest.fn()
            $.fn.find = () => ({html: jest.fn()})

            // Récupération des icônes eye
            const iconEye = screen.getAllByTestId('icon-eye')

            const handleClickIconEyeSpy = jest.spyOn(billsContainer, 'handleClickIconEye')

            userEvent.click(iconEye[0])

            expect(handleClickIconEyeSpy).toHaveBeenCalledWith(iconEye[0])
            expect($.fn.modal).toHaveBeenCalledWith('show')
        })

        test("Then new bill button should call handleClickNewBill event", () => {

            const onNavigate = jest.fn((pathname) => {
                document.body.innerHTML = ROUTES({pathname})
            })

            Object.defineProperty(window, 'localStorage', {value: localStorageMock})
            window.localStorage.setItem('user', JSON.stringify({
                type: 'Employee'
            }))

            document.body.innerHTML = BillsUI({data: bills})

            const billsContainer = new Bills({
                document,
                onNavigate,
                store: null,
                localStorage: window.localStorage
            })

            $.fn.width = () => 500
            $.fn.modal = jest.fn()
            $.fn.find = () => ({html: jest.fn()})

            const handleClickNewBillSpy = jest.spyOn(billsContainer, 'handleClickNewBill')

            const buttonNewBill = screen.getByTestId('btn-new-bill')

            buttonNewBill.addEventListener('click', () => billsContainer.handleClickNewBill())

            userEvent.click(buttonNewBill)

            expect(handleClickNewBillSpy).toHaveBeenCalled()
            expect(onNavigate).toHaveBeenCalledWith(ROUTES_PATH['NewBill'])
        })

        test("Then should getBills", async () => {
            Object.defineProperty(window, 'localStorage', {value: localStorageMock})
            window.localStorage.setItem('user', JSON.stringify({
                type: 'Employee',
                email: 'employee@test.com'
            }))

            // Création d'un mock pour le store
            const mockStore = {
                bills: () => ({
                    list: jest.fn().mockResolvedValue(bills)
                })
            }

            const billsContainer = new Bills({
                document,
                onNavigate: jest.fn(),
                store: mockStore,
                localStorage: window.localStorage
            })

            const result = await billsContainer.getBills()

            expect(result.length).toBe(bills.length)
            result.forEach(bill => {
                expect(bill).toHaveProperty('id')
                expect(bill).toHaveProperty('name')
                expect(bill).toHaveProperty('date')
                expect(bill).toHaveProperty('amount')
                expect(bill).toHaveProperty('status')
            })
        })

        test("Then should handle corrupted date in getBills", async () => {
            // Configuration du localStorage
            Object.defineProperty(window, 'localStorage', {value: localStorageMock})
            window.localStorage.setItem('user', JSON.stringify({
                type: 'Employee',
                email: 'employee@test.com'
            }))

            const corruptedBills = [...bills];
            corruptedBills[0].date = 'date-invalide';

            const mockStore = {
                bills: () => ({
                    list: jest.fn().mockResolvedValue(corruptedBills)
                })
            }

            jest.spyOn(console, 'log').mockImplementation(() => {
            });

            const billsContainer = new Bills({
                document,
                onNavigate: jest.fn(),
                store: mockStore,
                localStorage: window.localStorage
            })

            const result = await billsContainer.getBills()

            expect(console.log).toHaveBeenCalled()
            expect(result[0].date).toBe('date-invalide')
            expect(result[0].status).not.toBe(corruptedBills[0].status)
        })

        test("Then bills should be ordered from earliest to latest", () => {
            document.body.innerHTML = BillsUI({data: bills.sort((a, b) => (a.date < b.date ? 1 : -1))})
            const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
            const antiChrono = (a, b) => ((a < b) ? 1 : -1)
            const datesSorted = [...dates].sort(antiChrono)
            expect(dates).toEqual(datesSorted)
        })
    })
})
