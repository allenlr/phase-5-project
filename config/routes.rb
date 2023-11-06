Rails.application.routes.draw do
  resources :users, only: [:index, :show, :create, :update, :destroy] do
    resources :reviews, only: [:index]
    get "service_providers/:service_provider_id", to: "users#user_accessed_service_provider"
  end

  resources :service_types, only: [:index, :show] do
    resources :service_providers, only: [:index, :show] do
      resources :reviews, only: [:index, :create]
    end
  end

  resources :user_service_providers, only: [:create, :index, :show, :destroy]


  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
end
