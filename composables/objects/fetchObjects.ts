export default async function fetchObjects(apiUrl: string, toast: any) {
  try {
    const response = await $fetch(`${apiUrl}/api/v1/objects`);
    return response;
  } catch (error) {
    toast.add({
      title: 'Erreur',
      description: 'Une erreur est survenue lors de la recherche des objets.',
      color: 'red',
    });
    throw error;
  }
}