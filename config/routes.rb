Rails.application.routes.draw do
  get 'static/home'
  root to: 'static#home'

  get '/:phrase', to: "static#share"

  resources :phrases
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
