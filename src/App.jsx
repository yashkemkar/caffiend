import CoffeeForm from "./components/CoffeeForm"
import Layout from "./components/Layout"
import Hero from "./components/Hero"
import Stats from "./components/Stats"
import History from "./components/History"


function App() {

  // Creating fake authentication state for the purposes of development
  const isAuthenticated = true

  const authenticatedContent = (
    <>
      <Stats />
      <History />
    </>
  )

  return (
    <Layout>
      <Hero />
      <CoffeeForm />
      {isAuthenticated && (authenticatedContent)} {/*only render authenticated content if user is logged in*/}
    </Layout>
  )
}

export default App
