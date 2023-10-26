Rails.application.routes.draw do
  resources :users, only: [:index, :show, :create] do
    resources :reviews, only: [:index]
  end

  resources :service_types, only: [:index, :show] do
    resources :service_providers, only: [:index, :show] do
      resources :reviews, only: [:index, :create]
    end
  end

  resources :users do
    resources :user_service_providers, only: [:create, :index, :show, :destroy]
  end

  resources :service_providers do
    resources :user_service_providers, only: [:create, :index, :show, :destroy]
  end

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
end
