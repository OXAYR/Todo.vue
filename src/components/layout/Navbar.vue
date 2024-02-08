<template>
	<nav class="bg-gray-800">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16">
				<div class="flex items-center">
					<div class="flex-shrink-0 text-white">TaskBoard</div>
				</div>

				<div class="hidden md:block">
					<div class="ml-4 flex items-center md:ml-6">
						<button
							class="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium"
						>
							Sign In
						</button>

						<button
							class="ml-4 bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium"
						>
							Register
						</button>
					</div>
				</div>

				<div class="-mr-2 flex md:hidden">
					<button
						type="button"
						class="text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
					>
						<svg
							class="h-6 w-6"
							stroke="currentColor"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16m-7 6h7"
							></path>
						</svg>
					</button>
				</div>
			</div>
		</div>

		<div
			class="md:hidden"
			id="mobile-menu"
		>
			<div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
				<button
					class="block w-full text-left bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium"
				>
					Sign In
				</button>
				<button
					class="mt-1 block w-full text-left bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium"
				>
					Register
				</button>
			</div>
		</div>
	</nav>
</template>
<script setup></script>
