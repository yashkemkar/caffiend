import { calculateCoffeeStats, calculateCurrentCaffeineLevel, coffeeConsumptionHistory, getTopThreeCoffees, statusLevels } from "../utils"

// Creating one function for Stat Card that can be repeated multiple times to print out each card. Parsing in the required props and destructuring to set up the structure of the card.
function StatCard(props) {
    const { lg, title, children } = props
    return (
        <div className={"card stat-card " + (lg ? ' col-span-2' : '')}>
            <h4>{title}</h4>
            {children}
        </div>
    )
}

export default function Stats() {
    // Default stats set to show on the application when there is no user input information.
    const stats = calculateCoffeeStats(coffeeConsumptionHistory)

    // Calculating current caffeine level utilising the user's coffee consumption history from their own inputs.
    const caffeineLevel = calculateCurrentCaffeineLevel(coffeeConsumptionHistory)
    // conditional logic to assign dynamic value to warning level
    const warningLevel = caffeineLevel < statusLevels['low'].maxLevel ? 'low' :
        caffeineLevel < statusLevels['moderate'].maxLevel ? 'moderate' : 'high'

    // returning a grid of 5 stat cards with various stats, set with dynamic styling to display unique information/colours based on the user's information. I have used the children props so I can easily repeat the stats cards as many times as I want, even if information is different.
    return (
        <>
            <div className="section-header">
                <i className="fa-solid fa-chart-simple" />
                <h2>Stats</h2>
            </div>
            <div className="stats-grid">
                <StatCard lg title='Active Caffeine Level'>
                    <div className="status"> {/*Dynamic status card that changes styling based on dynamic value of warningLevel variable. */}
                        <p><span className="stat-text">{caffeineLevel}</span> mg</p>
                        <h5 style={{ color: statusLevels[warningLevel].color, background: statusLevels[warningLevel].background }}>Low</h5>
                    </div>
                    <p>{statusLevels[warningLevel].description}</p>
                </StatCard>
                <StatCard title='Daily Caffeine (mg)'>
                    <p><span className="stat-text">{stats.daily_caffeine}</span> mg</p>
                </StatCard>
                <StatCard title='Average # of Coffees per day'>
                    <p><span className="stat-text">{stats.average_coffees}</span></p>
                </StatCard>
                <StatCard title='Daily cost ($)'>
                    <p>$ <span className="stat-text">{stats.daily_cost}</span></p>
                </StatCard>
                <StatCard title='Total Cost ($)'>
                    <p>$ <span className="stat-text">{stats.total_cost}</span></p>
                </StatCard>

                {/*Created a table to display the top 3 sources of caffeine consumption for the user, total number of purchases and the caffeine consumption from this beverage as a percentage of total caffeine consumed. */}
                <h3>Top 3 Sources of Caffeine</h3>
                <table className="stat-table">
                    <thead>
                        <tr>
                            <th>Coffee Name</th>
                            <th>Number of Purchases</th>
                            <th>Percentage of Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getTopThreeCoffees(coffeeConsumptionHistory).map((coffee, coffeeIndex)=>{
                            return(
                                <tr key={coffeeIndex}>
                                    <td>{coffee.coffeeName}</td>
                                    <td>{coffee.count}</td>
                                    <td>{coffee.percentage}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}