
import "react"

type Team = {
  name: string
  logo: string
}

type LeagueResponse = {
  country: Object
  logo: string
  name: string
  teams: Team[]
  type: string
}

const leaguesQuery = `
            query LeaguesQuery($countryId: String, $year: String) {
              getLeagues(countryID: $countryId, year: $year) {
                country {
                  code
                }
                logo
                type
                name
                teams {
                  name
                  logo
                }
              }
            }
          `

export type LeaguesProps = {
  countryId: string
  year: string
}

export default function Leagues({ countryId, year }: LeaguesProps) {
  const displayLeagues = async () => {
    const response = await fetch("http://localhost:8080/graphql",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: leaguesQuery,
          variables: {
            countryId,
            year
          }
        })
      }
    )
    const leagues_json = await response.json()
    const leagues: LeagueResponse[] = leagues_json.data.getLeagues
    return leagues.map((league) => (
      <div>
        <h1>{league.name}</h1>
        <img src={league.logo} />
      </div>
    ))
  }

  return (
    <div>
      {displayLeagues()}
    </div>
  )
}