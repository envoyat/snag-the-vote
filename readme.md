# GovHack 2024
### Envoy

## Snag the vote

Challenge: [Civic participation for a more resilient, cohesive democracy.](https://hackerspace.govhack.org/challenges/civic_participation_for_a_more_resilient_cohesive_democracy)

How can we help more people to understand their democracy, have an opportunity to participate in civic life, contribute to their community, and/or feel a sense of belonging and responsibility?

Want to see it in action? [Go to the proof-of-concept site](https://gentle-mud-04beaf81e.5.azurestaticapps.net/)

Or just clone and run it yourself:
```
npm i
npm run dev
```

## Useful Links

Flowchart: [Miro](https://miro.com/app/board/uXjVKiUvmvw=/)

Sample Map: [ArcGIS map with data](https://www.arcgis.com/apps/mapviewer/index.html?webmap=88d2b75f8cd24ec0bbfc0d75c906e83b)

Overview: [Figma Wireframes](https://www.figma.com/design/QUqihcQSiFGABeAdUZdCGm/Snag-the-vote?node-id=44-768&node-type=CANVAS&t=wWOyvdlekEjFZlcG-0)

Interactive design: [Figma Prototype](https://www.figma.com/proto/QUqihcQSiFGABeAdUZdCGm/Snag-the-vote?page-id=44%3A768&node-id=185-5625&node-type=CANVAS&viewport=629%2C432%2C0.05&t=3gjrLZtCQJ3Mm9M9-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=185%3A5625&show-proto-sidebar=1)

## Key Features/Stories

Elections bring all of Australia together for voting. How can we encourage people to engage with the democratic voting system, their community, be informed of their local members and enjoy a good sausage at the same time?

- Customers and Vendors can register via website or QR code. Registration is open before election day to allow build up of community.
- Loading the app will default to the users current GPS location. Shows basic information on closest polling station with/without sausage sizzle on.
- Information on local members. Links to local members site for more information.
- Information on locations current member/party affiliation.
- Information on members on the ballot. Links to more details on external site.
  - Candidate summary is randomised to avoid any preference in displaying data (RNG).
- Data pulled from AEC shows non-biased data on selected location.
- Can vote for sausage by emojis. Scale 1 - 3.
- Voting options allow for what was on the sausage
  - With/Without onions
  - With/Without sauce (Red/Yellow)
- Can view ongoing results of votes by GPS
- Uploding of photos for social engagement
  - Photo
  - Text with some hash tags
 - Can view election results for selected location as they come in via AEC data.
 - Can view voting results of sausage ratings as they come in via app.

## Addons and Ver 2.0

Encourage continued engagement by showing AEC counting results.

Allow people to register their sausage sizzle (e.g. Bunnings, RSL, Sports Event) nearby voting stations.

Can extend the map overlays to include information about selected location
- School Data
- Council Data
- Nearby parking/charging stations, etc..
  
