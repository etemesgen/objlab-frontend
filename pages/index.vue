<template>
  <div class="p-5 md:p-10">
    <div class="mt-10 md:mt-0">
      <Navbar />
    </div>
    
    <div class="mt-16 md:mt-32">
      <MainSection />
    </div>

    <div id="features" class="mt-32 flex flex-col md:flex-row gap-8">
      <FeatureCard 
        :icon="'i-heroicons-archive-box'" 
        title="Gestion des objets" 
        description="Ajoutez, modifiez, organisez et supprimez facilement vos objets avec des outils intuitifs." 
      />
      <FeatureCard 
        :icon="'i-heroicons-user-circle'" 
        title="Gestion de profil" 
        description="Mettez à jour vos informations personnelles et gérez vos paramètres de compte en toute simplicité." 
      />
      <FeatureCard 
        :icon="'i-heroicons-magnifying-glass'" 
        title="Recherche rapide" 
        description="Trouvez vos objets ou données en un clin d'œil grâce à une barre de recherche performante." 
      />
      <FeatureCard 
        :icon="'i-heroicons-shield-check'" 
        title="Données sécurisées" 
        description="Vos données et celles de vos objets sont protégées grâce à des protocoles de sécurité avancés." 
      />
    </div>

    <div id="faq" class="mt-32">
      <Faq />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from '../components/NavBar.vue';
import MainSection from '../components/MainSection.vue';
import FeatureCard from '../components/FeatureCard.vue';
import Faq from '../components/Faq.vue';
</script>