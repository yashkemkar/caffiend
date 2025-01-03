import { calculateCurrentCaffeineLevel, coffeeConsumptionHistory, getCaffeineAmount, timeSinceConsumption } from "../utils";

export default function History() {
    return (
        <>
            <div className="section-header">
                <i className="fa-solid fa-timeline" />
                <h2>History</h2>
            </div>
            <p><i>Hover for more information!</i></p>
            <div className="coffee-history">
                {/*Turns this object into an array and sorts in chronological order, so that the consumption history is ordered correctly. Also, there are multiple stats that are accessed so that they can be displayed on hover. */}
                {Object.keys(coffeeConsumptionHistory).sort((a, b) => b - a).map((utcTime, coffeeIndex) => {
                    const coffee = coffeeConsumptionHistory[utcTime]
                    const timeSinceConsume = timeSinceConsumption(utcTime)
                    const originalAmount = getCaffeineAmount(coffee.name)
                    const remainingAmount = calculateCurrentCaffeineLevel({
                        [utcTime]:coffee
                    })

                    const summary =`${coffee.name} | ${timeSinceConsume} | $${coffee.cost} ${originalAmount}mg / ${remainingAmount}mg`
                    return (
                        <div title={summary} key={coffeeIndex}>
                            <i className="fa-solid fa-mug-hot"/>
                        </div>
                    )
                })}
            </div>
        </>
    )
}