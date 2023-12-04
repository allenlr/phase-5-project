Rails.application.routes.draw do
  resources :users, only: [:index, :show, :create, :update, :destroy] do
    resources :user_service_providers, only: [:index]
    resources :reviews, only: [:index]
    get "service_providers/:service_provider_id", to: "users#user_accessed_service_provider"
  end

  resources :service_types, only: [:index, :show]

  
    
  resources :service_providers, only: [:index, :show] do
    resources :user_service_providers, only: [:index]
    resources :reviews, only: [:index, :create, :update, :destroy, :show]
  end

  resources :user_service_providers, only: [:create, :show]

  get "/:service_type_id/service_providers/location/:zip_code/:distance", to: "service_providers#search_by_location"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
end
