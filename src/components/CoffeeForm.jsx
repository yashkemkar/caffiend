import { coffeeOptions } from "../utils"
import { useState } from "react"

export default function CoffeeForm() {

    const [selectedCoffee, setSelectedCoffee] = useState(null)
    const [showCoffeeTypes, setShowCoffeeTypes] = useState(false)
    const [coffeeCost, setCoffeeCost] = useState(0)
    const [hour, setHour] = useState(0)
    const [min, setMin] = useState(0)

    function handleSubmitForm(){
        console.log(selectedCoffee,coffeeCost,hour,min)
    }

    return (
        <>
            <div className='section-header'>
                <i className="fa-solid fa-pencil" />
                <h2>Start Tracking Today</h2>
            </div>
            <h4>Select coffee type</h4>
            <div className='coffee-grid'>
                {coffeeOptions.slice(0, 5).map((option, optionIndex) => {
                    return (
                        <button onClick={() => {
                            {/*Sets the selected coffee state to the one the user has chosen, and resets the useState to show the other coffee types to false (hides the dropdown menu). */ }
                            setSelectedCoffee(option.name)
                            setShowCoffeeTypes(false)
                        }} className={'button-card' + (option.name === selectedCoffee ? ' coffee-button-selected' : '')} key={optionIndex}>
                            <h4>{option.name}</h4>
                            <p>{option.caffeine} mg</p>
                        </button>
                    )
                })}
                {/*Sets the selected coffee state to false, and resets the useState to show the other coffee types to true (shows the dropdown menu). */}
                <button onClick={() => {
                    setShowCoffeeTypes(true)

                    {/*It's not actually needed for the functionality to work, but without it there is a bug where another button is shown as "selected" as well as the other button. I have to reset the state to false. */ }
                    setSelectedCoffee(false)
                }}
                    className={'button-card' + (showCoffeeTypes ? ' coffee-button-selected' : ' ')}>
                    <h4>Other</h4>
                    <p>n/a</p>
                </button>
            </div>
            {/*Create a dropdown option list that will pull each value by mapping through the coffee options using the option index. Pull out name and caffeine amount accordingly.*/}
            {showCoffeeTypes && (
                <select onChange={(e) => {
                    setSelectedCoffee(e.target.value)
                }} id='coffee-list' name='coffee-list'>
                    <option value={null}>Select type</option>
                    {coffeeOptions.map((option, optionIndex) => {
                        return (
                            <option value={option.name} key={optionIndex}>
                                {option.name} ({option.caffeine} mg)
                            </option>
                        )
                    })}
                </select>
            )}
            <h4>Add the Cost ($)</h4>
            <input className="w-full" type="number" placeholder="4.50" value={coffeeCost} onChange={(e) => {
                setCoffeeCost(e.target.value)
                console.log(coffeeCost)
            }} />
            <h4>Time since consumption</h4> {/*In hours and minutes (input box) */}
            <div className="time-entry">
                <div>
                    <h6>Hours</h6>
                    <select id="hours-select" onChange={(e) => {
                        setHour(e.target.value)
                    }}>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((hour, hourIndex) => {
                            return (
                                <option key={hourIndex} value={hour}>{hour}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <h6>Mins</h6>
                    <select id="mins-select" onChange={(e) => {
                        setMin(e.target.value)
                    }}>
                        {[0, 5, 10, 15, 30, 45].map((min, minIndex) => {
                            return (
                                <option key={minIndex} value={min}>{min}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <button onClick={handleSubmitForm}>
                <p>Add Entry</p>
            </button>
        </>
    )
}