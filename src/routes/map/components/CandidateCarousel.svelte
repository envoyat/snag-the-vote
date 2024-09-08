<script lang="ts">
  import { slide } from 'svelte/transition';
  import { type Candidate, type DivisionWithMemberAndCandidates } from '../../../types/apiData';

  const images = [
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=640'
  ]

  interface Props {
    data: DivisionWithMemberAndCandidates;
  }

  let { data }: Props = $props();

  // Duplicate data to allow a more seamless carousel transition
  const candidates = [...data.candidates, ...data.candidates];

  const getFullName = (candidate: Candidate) => `${candidate.givenName} ${candidate.surname}`;
  const getDivisionParty = (candidate: Candidate) => `${candidate.party} - ${candidate.divisionName}`;

  const getPartyStyle = (party: string) => {
    const blue = 'border-blue-800';
    const colours: Record<string, string> = {
      labor: 'border-red-800',
      green: 'border-green-600',
      independent: 'border-yellow-600',
      liberal: blue,
      national: blue,
      coalition: blue,
      lnp: blue,
    };

    for (const key in colours) {
      if (party.toLowerCase().includes(key)) {
        return colours[key];
      }
    }
  };
</script>

<div class="carousel-container">
  <div transition:slide class="carousel carousel-center rounded-box h-32">
    {#each candidates as candidate}
      <div class="carousel-item w-80 p-1 border-y-4 {`${getPartyStyle(candidate.party)}`}">
        <div class="avatar">
          <div class="rounded w-32">
            <img src={images[0]} alt="{getFullName(candidate)} of {getDivisionParty(candidate)}" />
          </div>
        </div>
        <div class="prose p-2">
          <h4>{getFullName(candidate)}</h4>
          <p>{getDivisionParty(candidate)}</p>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .carousel-container {
    overflow: hidden;
    position: relative;
    width: 200%
  }

  .carousel {
    display: flex;
    animation: scroll 20s linear infinite;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .carousel-item {
    flex: 0 0 auto;
  }
</style>
