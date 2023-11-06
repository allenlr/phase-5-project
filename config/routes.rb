Rails.application.routes.draw do
  resources :users, only: [:index, :show, :create, :update, :destroy] do
    resources :user_service_providers, only: [:index, :show, :create, :destroy]
    resources :reviews, only: [:index]
  end

  resources :service_types, only: [:index, :show] do
    resources :service_providers, only: [:index, :show] do
      resources :reviews, only: [:index, :create]
    end
  end

  # resources :users do
  #   resources :user_service_providers, only: [:create, :index, :show, :destroy]
  # end
  get 'users/:id/service_providers_reviewed', to: 'users#service_providers_reviewed'
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
end
