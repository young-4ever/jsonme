<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- 主体网格布局 -->
      <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <!-- 主要内容区域 -->
        <div class="xl:col-span-3 space-y-8">
      <!-- 标题区域 -->
      <div class="text-center mb-8">
        <!-- 返回按钮 -->
        <div class="flex justify-start mb-4">
          <button
            @click="$emit('back')"
            class="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            返回简历
          </button>
        </div>
        
        <!-- 一次性Token访问提示 -->
        <div v-if="isOneTimeTokenAccess" class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div class="flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            <div class="text-blue-800 dark:text-blue-200">
              <p class="font-semibold">🎫 您正在使用分享的上传权限</p>
              <p class="text-sm mt-1">此链接只能使用一次，请确认文件无误后上传</p>
            </div>
          </div>
        </div>
        
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          JsonMe 文件上传
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          上传你的JSON简历文件，生成专属的JsonMe链接
        </p>
      </div>

      <!-- 输入方式选择 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <!-- 小按钮选择器 -->
        <div class="flex items-center justify-center gap-1 mb-6">
          <div class="inline-flex rounded-xl border border-gray-200 dark:border-gray-600 p-1 bg-gray-100 dark:bg-gray-700 shadow-sm">
            <button
              @click="inputMethod = 'upload'"
              class="flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200"
              :class="{
                'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm transform scale-105': inputMethod === 'upload',
                'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600': inputMethod !== 'upload'
              }"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <span class="hidden sm:inline">上传文件</span>
              <span class="sm:hidden">上传</span>
            </button>
            
            <button
              @click="inputMethod = 'editor'"
              class="flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200"
              :class="{
                'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm transform scale-105': inputMethod === 'editor',
                'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600': inputMethod !== 'editor'
              }"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              <span class="hidden sm:inline">在线编辑</span>
              <span class="sm:hidden">编辑</span>
            </button>
            
            <button
              @click="inputMethod = 'share'"
              class="flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200"
              :class="{
                'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm transform scale-105': inputMethod === 'share',
                'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600': inputMethod !== 'share'
              }"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
              </svg>
              <span class="hidden sm:inline">分享链接</span>
              <span class="sm:hidden">分享</span>
            </button>
          </div>
        </div>

        <!-- 文件上传区域 -->
        <div v-if="inputMethod === 'upload'" class="space-y-4 animate-fadeIn">
          <div
            @drop="handleDrop"
            @dragover.prevent="isDragover = true"
            @dragleave.prevent="isDragover = false"
            @dragenter.prevent
            @click="triggerFileInput"
            class="upload-zone border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-300"
            :class="{
              'border-primary-500 bg-primary-50 dark:bg-primary-900/20': isDragover,
              'border-gray-300 dark:border-gray-600 hover:border-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700': !isDragover
            }"
          >
            <input
              ref="fileInput"
              type="file"
              accept=".json,application/json"
              @change="handleFileSelect"
              class="hidden"
            />
            
            <div class="upload-icon mb-4">
              <svg class="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              点击或拖拽上传JSON文件
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              支持 .json 格式文件，最大5MB
            </p>
          </div>
        </div>

        <!-- JSON编辑器区域 -->
        <div v-if="inputMethod === 'editor'" class="space-y-4 animate-fadeIn">
          <!-- 工具栏 -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex flex-wrap gap-2">
              <button
                @click="loadTemplate"
                class="flex-1 sm:flex-none px-4 py-3 sm:px-3 sm:py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200 min-w-0"
              >
                <span class="hidden sm:inline">📄 加载模板</span>
                <span class="sm:hidden">📄 模板</span>
              </button>
              <button
                @click="switchEditorMode"
                class="flex-1 sm:flex-none px-4 py-3 sm:px-3 sm:py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200 min-w-0"
              >
                <span class="hidden sm:inline">🔄 {{ editorMode === 'form' ? '表单视图' : editorMode === 'tree' ? '树形视图' : '代码视图' }}</span>
                <span class="sm:hidden">🔄 {{ editorMode === 'form' ? '表单' : editorMode === 'tree' ? '树形' : '代码' }}</span>
              </button>
              <button
                @click="validateJsonEditor"
                class="flex-1 sm:flex-none px-4 py-3 sm:px-3 sm:py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-200 min-w-0"
              >
                <span class="hidden sm:inline">✅ 验证数据</span>
                <span class="sm:hidden">✅ 验证</span>
              </button>
            </div>
            <div class="flex items-center justify-center sm:justify-end gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <span>模式: {{ editorModeText }}</span>
              <span class="hidden sm:inline">|</span>
              <span>大小: {{ (editorContentSize / 1024).toFixed(1) }}KB</span>
            </div>
          </div>

          <!-- JSON编辑器容器 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
            <div 
              ref="jsonEditorContainer" 
              class="h-96 sm:h-80 md:h-96"
            ></div>
          </div>

          <!-- JSON验证错误 -->
          <div v-if="jsonValidationError" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p class="text-red-800 dark:text-red-200 text-sm">
              <strong>数据验证错误:</strong> {{ jsonValidationError }}
            </p>
          </div>

          <!-- 解析JSON按钮 -->
          <div class="flex justify-center">
            <button
              @click="parseJsonFromEditor"
              :disabled="!!jsonValidationError"
              class="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-semibold"
            >
              📝 解析JSON数据
            </button>
          </div>
        </div>

        <!-- 分享链接区域 -->
        <div v-if="inputMethod === 'share'" class="space-y-6 animate-fadeIn">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">🔗 生成分享上传链接</h2>
            <p class="text-gray-600 dark:text-gray-400">
              使用你的GitHub Token生成一次性上传链接，分享给他人上传JSON文件。每个链接只能使用一次，24小时内有效。
            </p>
          </div>
          
          <div v-if="!shareableLink" class="space-y-6">
            <!-- GitHub Token输入 -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                你的GitHub Token <span class="text-red-500">*</span>
              </label>
              <input
                v-model="shareGithubToken"
                type="password"
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                :class="{ 'border-red-300 dark:border-red-600': !shareGithubToken.trim() }"
              />
              <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-3 text-sm">
                <p class="text-blue-800 dark:text-blue-200 font-medium mb-2">📝 如何获取GitHub Token：</p>
                <ol class="text-blue-700 dark:text-blue-300 space-y-1 ml-4">
                  <li>1. 访问 <a href="https://github.com/settings/tokens" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline">GitHub Token设置</a></li>
                  <li>2. 点击 "Generate new token (classic)"</li>
                  <li>3. 只需勾选 <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded">gist</code> 权限</li>
                  <li>4. 复制生成的Token到此处</li>
                </ol>
                <p class="text-blue-600 dark:text-blue-400 text-xs mt-2">
                  ⚠️ Token将被编码到分享链接中，仅用于授权他人上传
                </p>
              </div>
            </div>
            
            <div class="flex justify-center">
              <button
                @click="generateShareableLink"
                :disabled="isGeneratingShareLink || !shareGithubToken.trim()"
                class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-semibold"
              >
                {{ isGeneratingShareLink ? '生成中...' : '🎫 生成分享链接' }}
              </button>
            </div>
          </div>
          
          <div v-else class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                分享链接（一次性使用，24小时有效）：
              </label>
              <div class="flex items-center space-x-2">
                <input
                  :value="shareableLink"
                  readonly
                  class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
                <button
                  @click="copyShareableLink"
                  class="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  title="复制链接"
                >
                  📋
                </button>
              </div>
            </div>
            
            <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div class="flex items-start">
                <svg class="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                <div class="text-yellow-800 dark:text-yellow-200">
                  <p class="font-medium">⚠️ 重要提醒：</p>
                  <ul class="text-sm mt-1 space-y-1">
                    <li>• 此链接只能使用一次，使用后立即失效</li>
                    <li>• 链接24小时后自动过期</li>
                    <li>• 链接中包含你的GitHub Token授权信息</li>
                    <li>• 请确保分享给可信任的人员</li>
                    <li>• 上传的文件将创建为公开的GitHub Gist</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="flex justify-center">
              <button
                @click="resetShareableLink"
                class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                重新生成
              </button>
            </div>
          </div>


        </div>

        <!-- 上传进度 -->
        <div v-if="isUploading" class="mt-6">
          <div class="flex items-center justify-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mr-3"></div>
            <span class="text-gray-700 dark:text-gray-300">正在处理数据...</span>
          </div>
        </div>

        <!-- 错误信息 -->
        <div v-if="error" class="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p class="text-red-800 dark:text-red-200">{{ error }}</p>
        </div>
      </div>

      <!-- 预览区域 -->
      <div v-if="uploadedData && !generatedLink" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">数据预览</h2>
        
        <!-- 基本信息预览 -->
        <div v-if="uploadedData.personal" class="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">个人信息</h3>
          <p class="text-gray-700 dark:text-gray-300">
            <strong>姓名:</strong> {{ uploadedData.personal.name || 'N/A' }}
          </p>
          <p class="text-gray-700 dark:text-gray-300">
            <strong>职位:</strong> {{ uploadedData.personal.title || 'N/A' }}
          </p>
        </div>

        <!-- 文件大小信息 -->
        <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">文件信息</h3>
          <p class="text-blue-800 dark:text-blue-200 text-sm">
            大小: {{ (jsonSize / 1024).toFixed(1) }}KB
            <span class="text-green-600 dark:text-green-400 ml-2">✓ 将上传到GitHub Gist</span>
          </p>
        </div>

        <!-- 上传方式选择 -->
        <div class="mb-6">
          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">上传方式</h3>
          <div class="space-y-3">
            <!-- GitHub Gist -->
            <div class="flex items-start space-x-3 p-4 border rounded-lg border-primary-500 bg-primary-50 dark:bg-primary-900/20">
              <div class="flex-1">
                <div class="font-medium text-gray-900 dark:text-white">
                  GitHub Gist
                  <span v-if="defaultGithubToken" class="text-green-600 dark:text-green-400 text-sm ml-2">🆓 免费服务可用</span>
                  <span v-else class="text-orange-600 dark:text-orange-400 text-sm ml-2">🔑 需要Token</span>
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  上传到GitHub Gist，永久保存，支持大文件
                </div>
                
                <div v-if="uploadMethod === 'gist'" class="mt-4 space-y-4">
                  <!-- 服务选择 -->
                  <div v-if="defaultGithubToken && !isOneTimeTokenAccess" class="space-y-3">
                    <div class="text-sm font-medium text-gray-700 dark:text-gray-300">选择上传方式：</div>
                    
                    <!-- 使用默认服务 -->
                    <label class="flex items-start space-x-3 p-3 border rounded cursor-pointer transition-colors"
                      :class="{
                        'border-blue-300 bg-blue-50 dark:bg-blue-900/20': useDefaultToken,
                        'border-gray-200 dark:border-gray-600': !useDefaultToken
                      }">
                      <input type="radio" v-model="useDefaultToken" :value="true" class="mt-1" />
                      <div class="flex-1">
                        <div class="font-medium text-gray-900 dark:text-white text-sm">
                          🆓 使用免费服务
                          <span class="text-green-600 dark:text-green-400">(推荐)</span>
                        </div>
                        <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          每小时限制{{defaultTokenRateLimit}}次上传，无需GitHub账号
                        </div>
                        <div class="text-xs text-blue-600 dark:text-blue-400 mt-1">
                          已使用: {{getCurrentUsage()}}/{{defaultTokenRateLimit}} 次
                        </div>
                      </div>
                    </label>
                    
                    <!-- 使用自己的Token -->
                    <label class="flex items-start space-x-3 p-3 border rounded cursor-pointer transition-colors"
                      :class="{
                        'border-blue-300 bg-blue-50 dark:bg-blue-900/20': !useDefaultToken,
                        'border-gray-200 dark:border-gray-600': useDefaultToken
                      }">
                      <input type="radio" v-model="useDefaultToken" :value="false" class="mt-1" />
                      <div class="flex-1">
                        <div class="font-medium text-gray-900 dark:text-white text-sm">
                          🔑 使用自己的Token
                        </div>
                        <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          无使用限制，需要GitHub账号
                        </div>
                      </div>
                    </label>
                  </div>
                  
                  <!-- GitHub Token输入 -->
                  <div v-if="(!useDefaultToken || !defaultGithubToken) && !isOneTimeTokenAccess" class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      GitHub Token <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="githubToken"
                      type="password"
                      placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                      required
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      :class="{ 'border-red-300 dark:border-red-600': (!useDefaultToken || !defaultGithubToken) && !githubToken.trim() }"
                    />
                    <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-3 text-sm">
                      <p class="text-blue-800 dark:text-blue-200 font-medium mb-2">📝 如何获取GitHub Token：</p>
                      <ol class="text-blue-700 dark:text-blue-300 space-y-1 ml-4">
                        <li>1. 访问 <a href="https://github.com/settings/tokens" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline">GitHub Token设置</a></li>
                        <li>2. 点击 "Generate new token (classic)"</li>
                        <li>3. 只需勾选 <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded">gist</code> 权限</li>
                        <li>4. 复制生成的Token到此处</li>
                      </ol>
                      <p class="text-blue-600 dark:text-blue-400 text-xs mt-2">
                        ⚠️ Token仅用于单次上传，不会被保存
                      </p>
                    </div>
                  </div>
                  
                  <!-- 一次性Token使用提示 -->
                  <div v-if="isOneTimeTokenAccess" class="space-y-2">
                    <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <div class="flex items-center">
                        <svg class="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div class="text-green-800 dark:text-green-200">
                          <p class="font-medium">✅ 分享权限已验证</p>
                          <p class="text-sm mt-1">您可以免费上传一次JSON文件，上传后此链接将失效</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- JSON预览 -->
        <div class="mb-6">
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">JSON数据</h3>
          <pre class="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm max-h-60">{{ formattedJson }}</pre>
        </div>

        <!-- 上传按钮 -->
        <div class="flex justify-center">
          <button
            @click="uploadToService"
            :disabled="isUploading || !isGistTokenValid()"
            class="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-semibold"
          >
            {{ isUploading ? '生成中...' : getUploadButtonText() }}
          </button>
        </div>
      </div>

      <!-- 结果区域 -->
      <div v-if="generatedLink" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <div class="text-center">
          <div class="mb-6">
            <div class="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              链接生成成功！
            </h2>
            <p class="text-gray-600 dark:text-gray-400">
              你的JsonMe简历链接已生成，可以分享给他人查看
            </p>
          </div>

          <!-- 链接展示 -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              你的JsonMe链接：
            </label>
            <div class="flex items-center space-x-2">
              <input
                :value="generatedLink"
                readonly
                class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
              <button
                @click="copyLink"
                class="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                :title="copyText"
              >
                📋
              </button>
            </div>
          </div>

          <!-- 二维码 -->
          <div v-if="qrCodeDataUrl" class="mb-6">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">扫码访问</h3>
            <div class="flex justify-center">
              <img :src="qrCodeDataUrl" alt="QR Code" class="w-48 h-48 border border-gray-200 dark:border-gray-600 rounded-lg" />
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              :href="generatedLink"
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-semibold"
            >
              预览简历
            </a>
            <button
              @click="reset"
              class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              上传新文件
            </button>
          </div>
        </div>
      </div>



        </div>
        
        <!-- 右侧使用说明栏 -->
        <div class="xl:col-span-1">
          <!-- 在大屏幕上固定在右侧，小屏幕上显示在底部 -->
          <div class="hidden xl:block sticky top-8">
            <!-- 大屏幕固定侧边栏内容 -->
            <!-- 上传文件说明 -->
            <div v-if="inputMethod === 'upload'" class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                📁 文件上传
              </h3>
              <div class="text-blue-800 dark:text-blue-200 space-y-3 text-sm">
                <div>
                  <h4 class="font-medium mb-1">📋 支持格式</h4>
                  <p class="text-xs">• JSON简历格式文件</p>
                  <p class="text-xs">• 最大文件大小: 5MB</p>
      </div>
                <div>
                  <h4 class="font-medium mb-1">🔧 必须字段</h4>
                  <p class="text-xs">• personal.name (姓名)</p>
                  <p class="text-xs">• personal.title (职位)</p>
                </div>
                <div>
                  <h4 class="font-medium mb-1">📊 可选字段</h4>
                  <p class="text-xs">• experience (工作经历)</p>
                  <p class="text-xs">• education (教育背景)</p>
                  <p class="text-xs">• skills (技能)</p>
                  <p class="text-xs">• projects (项目经历)</p>
                </div>
                <div>
                  <h4 class="font-medium mb-1">🚀 上传方式</h4>
                  <p class="text-xs">• 免费服务 (每小时10次)</p>
                  <p class="text-xs">• 自定义GitHub Token</p>
                </div>
              </div>
            </div>

            <!-- 在线编辑说明 -->
            <div v-if="inputMethod === 'editor'" class="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
              <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                ✏️ 在线编辑
              </h3>
              <div class="text-green-800 dark:text-green-200 space-y-3 text-sm">
                <div>
                  <h4 class="font-medium mb-1">🔄 编辑模式</h4>
                  <p class="text-xs">• 表单视图 (推荐新手)</p>
                  <p class="text-xs">• 树形视图 (结构清晰)</p>
                  <p class="text-xs">• 代码视图 (专业用户)</p>
                </div>
                <div>
                  <h4 class="font-medium mb-1">📄 快速开始</h4>
                  <p class="text-xs">• 点击"加载模板"获取示例</p>
                  <p class="text-xs">• 使用"验证数据"检查格式</p>
                </div>
                <div>
                  <h4 class="font-medium mb-1">💡 编辑技巧</h4>
                  <p class="text-xs">• 表单模式：直接填写字段</p>
                  <p class="text-xs">• 树形模式：展开节点编辑</p>
                  <p class="text-xs">• 代码模式：直接编辑JSON</p>
                </div>
                <div>
                  <h4 class="font-medium mb-1">⚠️ 注意事项</h4>
                  <p class="text-xs">• 保持JSON格式正确</p>
                  <p class="text-xs">• 必填字段不能为空</p>
                </div>
              </div>
            </div>

            <!-- 分享链接说明 -->
            <div v-if="inputMethod === 'share'" class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
              <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                </svg>
                🔗 分享链接
              </h3>
              <div class="text-purple-800 dark:text-purple-200 space-y-3 text-sm">
                <div>
                  <h4 class="font-medium mb-1">🎯 使用场景</h4>
                  <p class="text-xs">• 分享给他人上传简历</p>
                  <p class="text-xs">• 一次性授权上传</p>
                  <p class="text-xs">• 团队协作收集简历</p>
                </div>
                <div>
                  <h4 class="font-medium mb-1">🔒 安全特性</h4>
                  <p class="text-xs">• 一次性使用，用后失效</p>
                  <p class="text-xs">• 24小时自动过期</p>
                  <p class="text-xs">• Token安全编码</p>
                </div>
                <div>
                  <h4 class="font-medium mb-1">📝 前置要求</h4>
                  <p class="text-xs">• 需要GitHub账号</p>
                  <p class="text-xs">• 生成GitHub Token</p>
                  <p class="text-xs">• Token需要gist权限</p>
                </div>
                <div>
                  <h4 class="font-medium mb-1">⚠️ 重要提醒</h4>
                  <p class="text-xs">• 仅分享给可信人员</p>
                  <p class="text-xs">• 文件将公开存储</p>
                  <p class="text-xs">• 一个链接只能用一次</p>
                </div>
              </div>
            </div>

            <!-- 通用帮助信息 -->
            <div class="mt-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <h4 class="font-medium text-gray-900 dark:text-white mb-2 flex items-center text-sm">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                💡 常见问题
              </h4>
              <div class="text-gray-600 dark:text-gray-400 text-xs space-y-2">
                <div>
                  <strong>Q: 如何获取GitHub Token？</strong>
                  <p>A: 前往GitHub设置 > 开发者设置 > 个人访问令牌</p>
                </div>
                <div>
                  <strong>Q: 生成的链接永久有效吗？</strong>
                  <p>A: 是的，简历链接永久有效，可随时访问</p>
                </div>
                <div>
                  <strong>Q: 文件安全吗？</strong>
                  <p>A: 文件存储在GitHub Gist，公开但安全</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 小屏幕版本：显示在主内容下方 -->
          <div class="xl:hidden mt-8">
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <h4 class="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                💡 快速帮助
              </h4>
              <div class="text-gray-600 dark:text-gray-400 text-sm space-y-2">
                <div v-if="inputMethod === 'upload'">
                  <p><strong>文件上传:</strong> 支持JSON格式，最大5MB，需包含personal.name字段</p>
                </div>
                <div v-if="inputMethod === 'editor'">
                  <p><strong>在线编辑:</strong> 可切换表单/树形/代码视图，点击加载模板快速开始</p>
                </div>
                <div v-if="inputMethod === 'share'">
                  <p><strong>分享链接:</strong> 生成一次性上传链接，需GitHub Token，24小时有效</p>
                </div>
                <p><strong>存储方式:</strong> 文件上传到GitHub Gist，永久保存，公开访问</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'

// 立即阻止浏览器自动恢复滚动位置
if (typeof window !== 'undefined') {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }
  window.scrollTo(0, 0)
}
import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css'

// 定义emit事件
const emit = defineEmits<{
  back: []
}>()

// 响应式数据
const fileInput = ref<HTMLInputElement>()
const isDragover = ref(false)
const uploadedData = ref<any>(null)
const isUploading = ref(false)
const error = ref<string>('')
const generatedLink = ref<string>('')
const qrCodeDataUrl = ref<string>('')
const copyText = ref('复制链接')
const uploadMethod = ref<'gist'>('gist')
const githubToken = ref<string>('')
const useDefaultToken = ref<boolean>(true)

// JSON编辑器相关
const inputMethod = ref<'upload' | 'editor' | 'share'>('upload')
const jsonEditorContainer = ref<HTMLElement>()
const editorMode = ref<'tree' | 'form' | 'code'>('form')
const jsonValidationError = ref<string>('')
let jsonEditor: JSONEditor | null = null

// 获取默认Token配置
const defaultGithubToken = import.meta.env.VITE_DEFAULT_GITHUB_TOKEN || ''
const defaultTokenRateLimit = parseInt(import.meta.env.VITE_DEFAULT_TOKEN_RATE_LIMIT || '10')

// 速率限制相关
const rateLimitKey = 'jsonme_upload_count'
const rateLimitWindow = 'jsonme_upload_window'

// 一次性Token相关
const oneTimeToken = ref<string>('')
const isGeneratingShareLink = ref<boolean>(false)
const shareableLink = ref<string>('')
const shareGithubToken = ref<string>('')
const usedTokensKey = 'jsonme_used_tokens'

// 检查是否通过一次性Token访问
const isOneTimeTokenAccess = ref<boolean>(false)
const currentOneTimeToken = ref<string>('')
const oneTimeGithubToken = ref<string>('')

// 计算属性
const formattedJson = computed(() => {
  if (!uploadedData.value) return ''
  return JSON.stringify(uploadedData.value, null, 2)
})

const jsonSize = computed(() => {
  if (!uploadedData.value) return 0
  return new Blob([JSON.stringify(uploadedData.value)]).size
})



// 计算编辑器内容大小
const editorContentSize = computed(() => {
  if (!jsonEditor) return 0
  try {
    const content = jsonEditor.get()
    return new Blob([JSON.stringify(content)]).size
  } catch {
    return 0
  }
})

const editorModeText = computed(() => {
  switch (editorMode.value) {
    case 'form': return '表单视图'
    case 'tree': return '树形视图'
    case 'code': return '代码视图'
    default: return '未知'
  }
})

// 页面初始化
function initializePage(): void {
  const urlParams = new URLSearchParams(window.location.search)
  const uploadToken = urlParams.get('upload_token')
  
  if (uploadToken) {
    const tokenValidation = validateOneTimeToken(uploadToken)
    if (tokenValidation.isValid && tokenValidation.githubToken) {
      isOneTimeTokenAccess.value = true
      currentOneTimeToken.value = uploadToken
      oneTimeGithubToken.value = tokenValidation.githubToken
      // 自动选择GitHub Gist方式
      uploadMethod.value = 'gist'
    } else {
      error.value = '分享链接已失效或已被使用。请联系分享者重新生成链接。'
    }
  }
}

// 触发文件选择
function triggerFileInput() {
  fileInput.value?.click()
}

// 处理文件拖拽
function handleDrop(event: DragEvent) {
  event.preventDefault()
  isDragover.value = false
  
  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    handleFile(files[0])
  }
}

// 处理文件选择
function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    handleFile(file)
  }
}

// 处理文件
function handleFile(file: File) {
  error.value = ''
  
  // 验证文件类型
  if (!file.type.includes('json') && !file.name.endsWith('.json')) {
    error.value = '请选择有效的JSON文件'
    return
  }
  
  // 验证文件大小 (5MB)
  if (file.size > 5 * 1024 * 1024) {
    error.value = '文件大小不能超过5MB'
    return
  }
  
  // 读取文件
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const text = e.target?.result as string
      const data = JSON.parse(text)
      
      // 验证必要字段
      if (!data.personal || !data.personal.name) {
        error.value = 'JSON文件必须包含personal.name字段'
        return
      }
      
      uploadedData.value = data
      
      // 默认使用GitHub Gist方式
        uploadMethod.value = 'gist'
      
    } catch (err) {
      error.value = '无效的JSON文件格式'
    }
  }
  
  reader.onerror = () => {
    error.value = '文件读取失败'
  }
  
  reader.readAsText(file)
}

// 生成链接的主函数
async function uploadToService() {
  if (!uploadedData.value) return
  
  isUploading.value = true
  error.value = ''
  
  try {
    // 只支持GitHub Gist方式
    const link = await uploadToGist()
    generatedLink.value = link
    
    // 生成二维码
    await generateQRCode(generatedLink.value)
    
  } catch (err) {
    error.value = err instanceof Error ? err.message : '生成链接失败，请重试'
  } finally {
    isUploading.value = false
  }
}



// 方案2：GitHub Gist（带可选token）
async function uploadToGist(): Promise<string> {
  // 如果是一次性Token访问，需要特殊处理
  if (isOneTimeTokenAccess.value) {
    const tokenValidation = validateOneTimeToken(currentOneTimeToken.value)
    if (!tokenValidation.isValid || !tokenValidation.githubToken) {
      throw new Error('分享链接已失效或已被使用。')
    }
  } else {
    // 正常的速率限制检查（仅在使用默认Token时）
    if (useDefaultToken.value && defaultGithubToken && !checkRateLimit()) {
      const remainingTime = getRemainingTime()
      throw new Error(`使用默认服务已达到限制（${defaultTokenRateLimit}次/小时）。请${remainingTime}后重试，或使用自己的GitHub Token。`)
    }
  }
  
  // 确定使用哪个Token
  let tokenToUse = ''
  if (isOneTimeTokenAccess.value) {
    // 一次性Token访问使用解码出的Token
    tokenToUse = oneTimeGithubToken.value
  } else if (useDefaultToken.value && defaultGithubToken) {
    tokenToUse = defaultGithubToken
  } else if (githubToken.value.trim()) {
    tokenToUse = githubToken.value.trim()
  } else {
    throw new Error('请选择使用默认服务或提供您自己的GitHub Token。')
  }

  const gistData = {
    description: `JsonMe Resume - ${uploadedData.value.personal?.name || 'Anonymous'}${isOneTimeTokenAccess.value ? ' (Shared Upload)' : ''}`,
    public: true,
    files: {
      'resume.json': {
        content: JSON.stringify(uploadedData.value, null, 2)
      }
    }
  }
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokenToUse}`,
    'X-GitHub-Api-Version': '2022-11-28'
  }
  
  try {
    const response = await fetch('https://api.github.com/gists', {
      method: 'POST',
      headers,
      body: JSON.stringify(gistData)
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      
      if (response.status === 401) {
        throw new Error('GitHub Token无效或已过期。请检查Token权限（需要gist权限）。')
      } else if (response.status === 403) {
        throw new Error('GitHub API速率限制已达到或Token权限不足。请稍后重试。')
      } else if (response.status === 422) {
        throw new Error('请求数据格式错误。请检查JSON文件格式。')
      } else {
        throw new Error(`GitHub上传失败: ${response.status} ${errorData.message || response.statusText}`)
      }
    }
    
    const gist = await response.json()
    const rawUrl = gist.files['resume.json'].raw_url
    
    // 处理使用计数
    if (isOneTimeTokenAccess.value) {
      // 标记一次性Token为已使用
      markTokenAsUsed(currentOneTimeToken.value)
    } else if (useDefaultToken.value && defaultGithubToken) {
      // 增加正常使用计数
      incrementUsageCount()
    }
    
    const baseUrl = getBaseUrl()
    const encryptedUrl = encryptGistUrl(rawUrl)
    
    // 验证加密/解密是否正常工作
    try {
      const decryptedTest = decryptGistUrl(encryptedUrl)
      if (decryptedTest !== rawUrl) {
        console.error('加密验证失败:', { original: rawUrl, decrypted: decryptedTest })
        throw new Error('链接加密验证失败')
      }
      console.log('✅ 链接加密验证成功')
    } catch (verifyErr) {
      console.error('加密验证出错:', verifyErr)
      // 降级到直接使用gist参数
    return `${baseUrl}?gist=${encodeURIComponent(rawUrl)}`
    }
    
    return `${baseUrl}?data=${encryptedUrl}`
  } catch (error) {
    // 重新抛出我们自定义的错误消息
    if (error instanceof Error) {
      throw error
    }
    throw new Error('网络连接失败，请检查网络连接后重试。')
  }
}



// 加密Gist URL
function encryptGistUrl(url: string): string {
  try {
    // 1. Base64编码
    const base64Encoded = btoa(url)
    
    // 2. 字符替换混淆 (使用循环映射避免无效字符)
    const substituted = base64Encoded
      .replace(/[A-Z]/g, (char) => {
        const code = char.charCodeAt(0) - 65 // A=0, B=1, ..., Z=25
        const shifted = (code + 1) % 26 // 循环映射
        return String.fromCharCode(shifted + 65)
      })
      .replace(/[a-z]/g, (char) => {
        const code = char.charCodeAt(0) - 97 // a=0, b=1, ..., z=25
        const shifted = (code + 1) % 26 // 循环映射
        return String.fromCharCode(shifted + 97)
      })
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
    
    // 3. 反转字符串
    const reversed = substituted.split('').reverse().join('')
    
    // 4. 添加随机前缀和后缀以增加混淆
    const timestamp = Date.now().toString(36).slice(-4)
    const random = Math.random().toString(36).substring(2, 6)
    
    return `${timestamp}${reversed}${random}`
  } catch (err) {
    console.error('URL加密失败:', err)
    // 降级方案：只使用URL编码
    return encodeURIComponent(url)
  }
}

// 解密Gist URL
function decryptGistUrl(encrypted: string): string {
  try {
    // 如果是旧格式的URL编码，直接解码
    if (encrypted.includes('http')) {
      return decodeURIComponent(encrypted)
    }
    
    // 1. 移除前缀和后缀（各4位）
    if (encrypted.length <= 8) {
      throw new Error('加密字符串太短')
  }
    const withoutPrefixSuffix = encrypted.slice(4, -4)
    
    // 2. 反转字符串
    const unreversed = withoutPrefixSuffix.split('').reverse().join('')
    
    // 3. 恢复字符替换 (使用循环映射的逆操作)
    const unsubstituted = unreversed
      .replace(/_/g, '/')
      .replace(/-/g, '+')
      .replace(/[A-Z]/g, (char) => {
        const code = char.charCodeAt(0) - 65 // A=0, B=1, ..., Z=25
        const shifted = (code - 1 + 26) % 26 // 循环反向映射
        return String.fromCharCode(shifted + 65)
      })
      .replace(/[a-z]/g, (char) => {
        const code = char.charCodeAt(0) - 97 // a=0, b=1, ..., z=25
        const shifted = (code - 1 + 26) % 26 // 循环反向映射
        return String.fromCharCode(shifted + 97)
      })
    
    // 4. Base64解码
    const decoded = atob(unsubstituted)
    
    return decoded
  } catch (err) {
    console.error('URL解密失败:', err)
    // 降级方案：尝试直接URL解码
    try {
      return decodeURIComponent(encrypted)
    } catch {
      throw new Error('链接解析失败，可能链接已损坏')
    }
  }
}

// 获取基础URL
function getBaseUrl(): string {
  let baseUrl = window.location.origin
  const pathname = window.location.pathname
  
  // 如果在GitHub Pages环境下（路径包含项目名）
  if (pathname.includes('/jsonme/')) {
    baseUrl += '/jsonme/'
  } else if (pathname !== '/' && !pathname.includes('index.html')) {
    // 处理其他子路径情况，去掉当前路径的最后一段
    const pathParts = pathname.split('/').filter(p => p)
    if (pathParts.length > 0) {
      pathParts.pop()
      baseUrl += '/' + pathParts.join('/') + '/'
    }
  } else {
    baseUrl += '/'
  }
  
  // 确保URL格式正确
  baseUrl = baseUrl.replace(/\/+$/, '') // 移除末尾的斜杠
  if (!baseUrl.endsWith('/')) {
    baseUrl += '/'
  }
  
  return baseUrl
}

// 生成二维码
async function generateQRCode(text: string) {
  try {
    // 使用QR Server API生成二维码
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`
    qrCodeDataUrl.value = qrUrl
  } catch (err) {
    console.warn('二维码生成失败:', err)
  }
}

// 复制链接
async function copyLink() {
  try {
    await navigator.clipboard.writeText(generatedLink.value)
    copyText.value = '已复制！'
    setTimeout(() => {
      copyText.value = '复制链接'
    }, 2000)
  } catch (err) {
    // 降级方案
    const textArea = document.createElement('textarea')
    textArea.value = generatedLink.value
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    
    copyText.value = '已复制！'
    setTimeout(() => {
      copyText.value = '复制链接'
    }, 2000)
  }
}

// 重置
function reset() {
  uploadedData.value = null
  generatedLink.value = ''
  qrCodeDataUrl.value = ''
  error.value = ''
  copyText.value = '复制链接'
  uploadMethod.value = 'gist'
  githubToken.value = ''
  
  // 重置编辑器状态
  destroyJsonEditor()
  jsonValidationError.value = ''
  inputMethod.value = 'upload'
  
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// 获取上传按钮文本
function getUploadButtonText(): string {
    if (!useDefaultToken.value || !defaultGithubToken) {
      if (!githubToken.value.trim()) {
        return '请先输入GitHub Token'
      }
    }
    
    if (useDefaultToken.value && defaultGithubToken && !checkRateLimit()) {
      return `服务限制已满（${getRemainingTime()}后重试）`
  }
  
  return '📤 上传到GitHub Gist'
}

// 检查速率限制
function checkRateLimit(): boolean {
  if (!useDefaultToken.value || !defaultGithubToken) {
    // 用户自己的Token不受限制
    return true
  }
  
  const now = Date.now()
  const windowStart = localStorage.getItem(rateLimitWindow)
  const currentCount = parseInt(localStorage.getItem(rateLimitKey) || '0')
  
  // 检查是否需要重置计数（1小时窗口）
  if (!windowStart || now - parseInt(windowStart) > 60 * 60 * 1000) {
    localStorage.setItem(rateLimitWindow, now.toString())
    localStorage.setItem(rateLimitKey, '0')
    return true
  }
  
  // 检查是否超过限制
  if (currentCount >= defaultTokenRateLimit) {
    return false
  }
  
  return true
}

// 增加使用计数
function incrementUsageCount(): void {
  if (useDefaultToken.value && defaultGithubToken) {
    const currentCount = parseInt(localStorage.getItem(rateLimitKey) || '0')
    localStorage.setItem(rateLimitKey, (currentCount + 1).toString())
  }
}

// 获取剩余时间
function getRemainingTime(): string {
  const windowStart = localStorage.getItem(rateLimitWindow)
  if (!windowStart) return '稍后'
  
  const elapsed = Date.now() - parseInt(windowStart)
  const remaining = 60 * 60 * 1000 - elapsed // 1小时
  
  if (remaining <= 0) return '现在'
  
  const minutes = Math.ceil(remaining / (60 * 1000))
  return `${minutes}分钟`
}

// 获取当前使用次数
function getCurrentUsage(): number {
  if (!useDefaultToken.value || !defaultGithubToken) {
    return 0
  }
  
  const currentCount = parseInt(localStorage.getItem(rateLimitKey) || '0')
  return currentCount
}

// 检查GitHub Token是否有效
function isGistTokenValid(): boolean {
  if (uploadMethod.value !== 'gist') {
    return true
  }
  
  // 如果有默认Token且选择使用默认服务
  if (useDefaultToken.value && defaultGithubToken) {
    return true
  }
  
  // 如果选择使用自己的Token，需要验证Token输入
  if (!useDefaultToken.value || !defaultGithubToken) {
    return githubToken.value.trim() !== ''
  }
  
  return true
}

// 生成一次性Token
function generateOneTimeToken(githubToken: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  // 将GitHub Token进行Base64编码后包含在token中
  const encodedToken = btoa(githubToken)
  const signature = btoa(`${timestamp}-${random}-${encodedToken}`).substring(0, 16)
  return `ott_${timestamp}_${random}_${encodedToken}_${signature}`
}

// 验证一次性Token并提取GitHub Token
function validateOneTimeToken(token: string): { isValid: boolean; githubToken?: string } {
  if (!token.startsWith('ott_')) {
    return { isValid: false }
  }
  
  try {
    const parts = token.split('_')
    if (parts.length !== 5) {
      return { isValid: false }
    }
    
    const timestamp = parseInt(parts[1])
    const now = Date.now()
    
    // 检查是否过期（24小时）
    if (now - timestamp > 24 * 60 * 60 * 1000) {
      return { isValid: false }
    }
    
    // 检查是否已使用
    const usedTokens = JSON.parse(localStorage.getItem(usedTokensKey) || '[]')
    if (usedTokens.includes(token)) {
      return { isValid: false }
    }
    
    // 解码GitHub Token
    const encodedToken = parts[3]
    const githubToken = atob(encodedToken)
    
    return { isValid: true, githubToken }
  } catch (err) {
    return { isValid: false }
  }
}

// 标记Token为已使用
function markTokenAsUsed(token: string): void {
  const usedTokens = JSON.parse(localStorage.getItem(usedTokensKey) || '[]')
  usedTokens.push(token)
  
  // 只保留最近100个已使用的token
  if (usedTokens.length > 100) {
    usedTokens.splice(0, usedTokens.length - 100)
  }
  
  localStorage.setItem(usedTokensKey, JSON.stringify(usedTokens))
}

// 生成分享链接
async function generateShareableLink(): Promise<void> {
  if (!shareGithubToken.value.trim()) {
    error.value = '请先输入GitHub Token'
    return
  }
  
  isGeneratingShareLink.value = true
  
  try {
    const token = generateOneTimeToken(shareGithubToken.value.trim())
    const baseUrl = getBaseUrl()
    const link = `${baseUrl}?upload&upload_token=${token}`
    
    shareableLink.value = link
    oneTimeToken.value = token
  } catch (err) {
    error.value = '生成分享链接失败'
  } finally {
    isGeneratingShareLink.value = false
  }
}

// 复制分享链接
async function copyShareableLink(): Promise<void> {
  try {
    await navigator.clipboard.writeText(shareableLink.value)
    // 可以添加一个临时的成功提示
  } catch (err) {
    // 降级方案
    const textArea = document.createElement('textarea')
    textArea.value = shareableLink.value
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
}

// 重置分享链接
function resetShareableLink(): void {
  shareableLink.value = ''
  oneTimeToken.value = ''
  shareGithubToken.value = ''
}

// JSON编辑器相关函数

// 初始化JSON编辑器
function initJsonEditor(): void {
  if (!jsonEditorContainer.value) return
  
  // 检测当前是否为深色模式
  const isDarkMode = document.documentElement.classList.contains('dark')
  
  const options = {
    mode: editorMode.value,
    modes: ['tree' as const, 'form' as const, 'code' as const],
    onChangeText: () => {
      validateJsonEditor()
    },
    onError: (error: Error) => {
      jsonValidationError.value = error.message
    }
  }
  
  jsonEditor = new JSONEditor(jsonEditorContainer.value, options)
  
  // 应用主题
  applyThemeToEditor()
  
  // 加载默认模板
  loadTemplate()
}

// 应用主题到编辑器
function applyThemeToEditor(): void {
  if (!jsonEditor || !jsonEditorContainer.value) return
  
  const isDarkMode = document.documentElement.classList.contains('dark')
  const container = jsonEditorContainer.value
  
  if (isDarkMode) {
    container.classList.add('dark-theme')
  } else {
    container.classList.remove('dark-theme')
  }
}

// 监听主题变化
function observeThemeChanges(): void {
  const observer = new MutationObserver(() => {
    applyThemeToEditor()
  })
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
  
  // 保存observer用于清理
  ;(window as any).__themeObserver = observer
}

// 清理主题观察器
function cleanupThemeObserver(): void {
  const observer = (window as any).__themeObserver
  if (observer) {
    observer.disconnect()
    delete (window as any).__themeObserver
  }
}

// 销毁JSON编辑器
function destroyJsonEditor(): void {
  if (jsonEditor) {
    jsonEditor.destroy()
    jsonEditor = null
  }
  cleanupThemeObserver()
}

// 切换编辑器模式
function switchEditorMode(): void {
  const modes: Array<'tree' | 'form' | 'code'> = ['form', 'tree', 'code']
  const currentIndex = modes.indexOf(editorMode.value)
  const nextIndex = (currentIndex + 1) % modes.length
  editorMode.value = modes[nextIndex]
  
  if (jsonEditor) {
    jsonEditor.setMode(editorMode.value)
    // 模式切换后重新应用主题
    setTimeout(() => {
      applyThemeToEditor()
    }, 100)
  }
}

// 加载JSON模板
function loadTemplate(): void {
  const template = {
    "personal": {
      "name": "你的姓名",
      "title": "你的职位",
      "avatar": "",
      "contact": {
        "email": "your@email.com",
        "phone": "138-0000-0000",
        "location": "所在城市",
        "website": "",
        "github": "",
        "linkedin": ""
      },
      "summary": "个人简介"
    },
    "experience": [
      {
        "id": "exp1",
        "company": "公司名称",
        "position": "职位名称",
        "startDate": "2022-01",
        "endDate": "2024-01",
        "current": false,
        "description": ["工作描述1", "工作描述2"],
        "achievements": ["主要成就1", "主要成就2"],
        "technologies": ["技术栈1", "技术栈2"]
      }
    ],
    "education": [
      {
        "id": "edu1",
        "school": "学校名称",
        "degree": "学位",
        "major": "专业",
        "startDate": "2018-09",
        "endDate": "2022-06",
        "gpa": "3.8/4.0",
        "description": "额外描述"
      }
    ],
    "skills": [
      {
        "id": "skill1",
        "name": "技能名称",
        "level": 90,
        "category": "技能分类"
      }
    ],
    "projects": [
      {
        "id": "proj1",
        "name": "项目名称",
        "description": "项目描述",
        "technologies": ["技术栈"],
        "startDate": "2023-01",
        "endDate": "2023-06",
        "current": false,
        "url": "项目链接",
        "github": "GitHub链接",
        "highlights": ["项目亮点1", "项目亮点2"]
      }
    ],
    "theme": {
      "name": "professional"
    }
  }
  
  if (jsonEditor) {
    jsonEditor.set(template)
    jsonValidationError.value = ''
  }
}

// 验证JSON编辑器数据
function validateJsonEditor(): void {
  if (!jsonEditor) {
    jsonValidationError.value = '编辑器未初始化'
    return
  }
  
  try {
    const data = jsonEditor.get()
    if (!data.personal || !data.personal.name) {
      jsonValidationError.value = '必须包含personal.name字段'
      return
    }
    jsonValidationError.value = ''
  } catch (err) {
    const error = err as Error
    jsonValidationError.value = error.message
  }
}

// 从编辑器解析JSON数据
function parseJsonFromEditor(): void {
  if (!jsonEditor) {
    error.value = '编辑器未初始化'
    return
  }
  
  try {
    const data = jsonEditor.get()
    
    // 验证必要字段
    if (!data.personal || !data.personal.name) {
      error.value = 'JSON文件必须包含personal.name字段'
      return
    }
    
    uploadedData.value = data
    error.value = ''
    
    // 默认使用GitHub Gist方式
      uploadMethod.value = 'gist'
    
  } catch (err) {
    error.value = '数据格式无效'
  }
}

// 监听输入方式变化，初始化或销毁编辑器
async function handleInputMethodChange(): Promise<void> {
  await nextTick()
  
  if (inputMethod.value === 'editor') {
    // 延迟初始化，确保DOM已渲染
    setTimeout(() => {
      initJsonEditor()
      observeThemeChanges()
    }, 100)
  } else {
    destroyJsonEditor()
  }
}

// 组件挂载时初始化
onMounted(() => {
  // 确保页面滚动到顶部
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
  
  initializePage()
  
  // 观察输入方式变化
  watch(inputMethod, () => {
    handleInputMethodChange()
  }, { immediate: true })
})

// 组件销毁时清理
onUnmounted(() => {
  destroyJsonEditor()
})
</script>

<style scoped>
.upload-zone:hover .upload-icon svg {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
}

/* 内容切换动画 */
.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* JSON编辑器样式修复 */
:deep(.jsoneditor) {
  border: none !important;
  border-radius: 0 !important;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace !important;
}

:deep(.jsoneditor-menu) {
  background: #f8f9fa !important;
  border-bottom: 1px solid #e9ecef !important;
  color: #495057 !important;
}

/* 树形视图样式 */
:deep(.jsoneditor-tree) {
  background: #ffffff !important;
  color: #212529 !important;
  font-size: 14px !important;
}

:deep(.jsoneditor-frame) {
  background: #ffffff !important;
  border: none !important;
}

/* 树形视图节点样式 */
:deep(.jsoneditor-tree .jsoneditor-field) {
  color: #0d6efd !important;
  font-weight: 600 !important;
}

:deep(.jsoneditor-tree .jsoneditor-value) {
  color: #198754 !important;
}

:deep(.jsoneditor-tree .jsoneditor-string) {
  color: #dc3545 !important;
}

:deep(.jsoneditor-tree .jsoneditor-number) {
  color: #fd7e14 !important;
}

:deep(.jsoneditor-tree .jsoneditor-boolean) {
  color: #6f42c1 !important;
}

:deep(.jsoneditor-tree .jsoneditor-null) {
  color: #6c757d !important;
}

/* 选中和悬停状态 */
:deep(.jsoneditor-tree .jsoneditor-selected) {
  background: #e3f2fd !important;
  border: 1px solid #2196f3 !important;
}

:deep(.jsoneditor-tree .jsoneditor-hover) {
  background: #f5f5f5 !important;
}

/* 表单模式样式 */
:deep(.jsoneditor-form) {
  background: #f8f9fa !important;
  padding: 1rem !important;
  color: #212529 !important;
}

:deep(.jsoneditor-form .form-control) {
  border: 1px solid #ced4da !important;
  border-radius: 0.375rem !important;
  padding: 0.5rem !important;
  background: #ffffff !important;
  color: #212529 !important;
}

:deep(.jsoneditor-form .form-control:focus) {
  border-color: #0d6efd !important;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25) !important;
}

:deep(.jsoneditor-form label) {
  color: #495057 !important;
  font-weight: 600 !important;
  margin-bottom: 0.5rem !important;
}

/* 代码模式样式 */
:deep(.jsoneditor-text) {
  background: #f8f9fa !important;
  color: #212529 !important;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace !important;
  font-size: 14px !important;
}

:deep(.ace_editor) {
  background: #ffffff !important;
  color: #212529 !important;
}

:deep(.ace_gutter) {
  background: #f8f9fa !important;
  color: #6c757d !important;
}

:deep(.ace_string) {
  color: #dc3545 !important;
}

:deep(.ace_constant.ace_numeric) {
  color: #fd7e14 !important;
}

:deep(.ace_constant.ace_language.ace_boolean) {
  color: #6f42c1 !important;
}

/* 移动端优化 */
@media (max-width: 640px) {
  :deep(.jsoneditor-menu) {
    height: auto !important;
    padding: 0.5rem !important;
  }
  
  :deep(.jsoneditor-menu button) {
    font-size: 12px !important;
    padding: 4px 8px !important;
    margin: 2px !important;
  }
  
  :deep(.jsoneditor-tree) {
    font-size: 13px !important;
    padding: 0.5rem !important;
  }
  
  :deep(.jsoneditor-form) {
    padding: 0.75rem !important;
  }
}

/* 深色主题适配 */
.dark-theme :deep(.jsoneditor-menu) {
  background: #374151 !important;
  border-bottom: 1px solid #4b5563 !important;
  color: #f9fafb !important;
}

.dark-theme :deep(.jsoneditor-tree) {
  background: #1f2937 !important;
  color: #f9fafb !important;
}

.dark-theme :deep(.jsoneditor-frame) {
  background: #1f2937 !important;
}

.dark-theme :deep(.jsoneditor-tree .jsoneditor-field) {
  color: #60a5fa !important;
}

.dark-theme :deep(.jsoneditor-tree .jsoneditor-value) {
  color: #34d399 !important;
}

.dark-theme :deep(.jsoneditor-tree .jsoneditor-string) {
  color: #fbbf24 !important;
}

.dark-theme :deep(.jsoneditor-tree .jsoneditor-number) {
  color: #fb7185 !important;
}

.dark-theme :deep(.jsoneditor-tree .jsoneditor-boolean) {
  color: #a78bfa !important;
}

.dark-theme :deep(.jsoneditor-tree .jsoneditor-null) {
  color: #9ca3af !important;
}

.dark-theme :deep(.jsoneditor-tree .jsoneditor-selected) {
  background: #1e40af !important;
  border: 1px solid #3b82f6 !important;
}

.dark-theme :deep(.jsoneditor-tree .jsoneditor-hover) {
  background: #374151 !important;
}

.dark-theme :deep(.jsoneditor-form) {
  background: #374151 !important;
  color: #f9fafb !important;
}

.dark-theme :deep(.jsoneditor-form .form-control) {
  background: #4b5563 !important;
  border: 1px solid #6b7280 !important;
  color: #f9fafb !important;
}

.dark-theme :deep(.jsoneditor-form .form-control:focus) {
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25) !important;
}

.dark-theme :deep(.jsoneditor-form label) {
  color: #e5e7eb !important;
}

.dark-theme :deep(.jsoneditor-text) {
  background: #1f2937 !important;
  color: #f9fafb !important;
}

.dark-theme :deep(.ace_editor) {
  background: #1f2937 !important;
  color: #f9fafb !important;
}

.dark-theme :deep(.ace_gutter) {
  background: #374151 !important;
  color: #9ca3af !important;
}
</style> 