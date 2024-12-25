export async function handleDeleteProfil(id: any, apiUrl: string, toast: any) {
  await $fetch(`${apiUrl}/api/v1/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(() => {
    toast.add({
      title: 'Profil supprimé',
      description: 'Le profil a été supprimé avec succès.',
      color: 'gray',
      timeout: 0
    });
  })
  .catch(() => {
    toast.add({
      title: 'Erreur',
      description: 'Une erreur est survenue lors de la suppression du profil.',
      color: 'red',
      timeout: 0
    });
  });
}