export async function handleEditProfil(id: any, event: Event, apiUrl: string, toast: any) {
  const formData = new FormData(event.target as HTMLFormElement);
  const data = Object.fromEntries(formData);

  await $fetch(`${apiUrl}/api/v1/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(() => {
    toast.add({
      title: "Profil modifié",
      description: "Le profil a été modifié avec succès.",
      icon: 'i-heroicons-check-circle',
      color: 'gray',
      timeout: 0
    });
  })
  .catch(() => {
    toast.add({
      title: 'Erreur',
      description: 'Une erreur est survenue.',
      icon: 'i-heroicons-x-circle',
      color: 'red',
      timeout: 0
    });
  });
}