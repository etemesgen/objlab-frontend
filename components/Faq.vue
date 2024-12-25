<script setup lang="ts">
const faqs = [
  {
    defaultOpen: true,
    label: 'Comment ajouter un nouvel objet dans l\'application ?',
    content: 'Cliquez sur le bouton "Ajouter" dans le tableau de bord, remplissez les champs requis tels que le nom, la description, et ajoutez une image. Une fois terminé, cliquez sur "Ajouter".'
  },
  {
    label: 'Comment retrouver rapidement un objet ?',
    content: 'Utilisez la barre de recherche située en haut de la page de votre tableau de bord pour trouver rapidement les objets dont vous avez besoin.'
  },
  {
    label: 'Mes données sont-elles sécurisées ?',
    content: 'Oui, vos données sont stockées sur des serveurs sécurisés et protégées par un chiffrement avancé. Nous respectons également les normes RGPD pour garantir la confidentialité et la sécurité de vos informations.'
  },
  {
    label: 'Comment accéder à l\'application ?',
    content: 'Vous pouvez accéder à l\'application via votre navigateur préféré en visitant notre site web. Assurez-vous de vous connecter avec vos identifiants pour accéder à toutes les fonctionnalités.'
  },
];
</script>

<template>
  <UAccordion id="faq" :items="faqs" color="gray" size="xl" variant="soft" />
</template>