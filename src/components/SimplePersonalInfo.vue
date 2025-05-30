<template>
  <section class="card mb-8 animate-fade-in-up">
    <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
      <!-- 头像 -->
      <div v-if="personal?.avatar" class="flex-shrink-0">
        <img
          :src="personal.avatar"
          :alt="`${personal.name}的头像`"
          class="w-32 h-32 rounded-full object-cover border-4 border-primary-200 dark:border-primary-800 shadow-lg"
          loading="lazy"
        />
      </div>
      
      <!-- 基本信息 -->
      <div class="flex-1 text-center md:text-left">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {{ personal?.name }}
        </h1>
        <h2 class="text-xl text-primary-600 dark:text-primary-400 mb-4 font-medium">
          {{ personal?.title }}
        </h2>
        
        <!-- 联系方式 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <a
            v-if="personal?.contact?.email"
            :href="`mailto:${personal.contact.email}`"
            class="contact-link"
          >
            📧 {{ personal.contact.email }}
          </a>
          
          <a
            v-if="personal?.contact?.phone"
            :href="`tel:${personal.contact.phone}`"
            class="contact-link"
          >
            📱 {{ personal.contact.phone }}
          </a>
          
          <span
            v-if="personal?.contact?.location"
            class="contact-link"
          >
            📍 {{ personal.contact.location }}
          </span>
          
          <a
            v-if="personal?.contact?.website"
            :href="personal.contact.website"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-link"
          >
            🌐 个人网站
          </a>
          
          <a
            v-if="personal?.contact?.github"
            :href="personal.contact.github"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-link"
          >
            🔗 GitHub
          </a>
          
          <a
            v-if="personal?.contact?.linkedin"
            :href="personal.contact.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-link"
          >
            💼 LinkedIn
          </a>
        </div>
        
        <!-- 个人简介 -->
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
          {{ personal?.summary }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps(['personal'])
</script> 