export const ssr = false;

export async function load({ fetch }) {
  return {
    props: {
      fetch,
    },
  };
}
