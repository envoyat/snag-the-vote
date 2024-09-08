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

  const getFullName = (candidate: Candidate) => `${candidate.givenName} ${candidate.surname}`;
  const getDivisionParty = (candidate: Candidate) => `${candidate.party} - ${candidate.divisionName}`;
</script>

<div transition:slide class="carousel carousel-center rounded-box h-32 bg-transparent">
  {#each data.candidates as candidate}
    <div class="carousel-item w-80 p-1 bg-auto">
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

<style>

</style>
