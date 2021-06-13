require "rails_helper"

RSpec.describe UserRefreshToken, type: :model do
  context "associations" do
    it { should belong_to(:user) }
  end

  context "scope" do
    describe "default scope" do
      let!(:token_no_expires) {FactoryBot.create :user_refresh_token}
      let!(:token_already_expired) {FactoryBot.create :user_refresh_token, expires_at: DateTime.current - 1.day}
      let!(:token_not_yet_expires) {FactoryBot.create :user_refresh_token, expires_at: DateTime.current + 1.day}

      it "should return only access token with expires_at NULL or not yet expires" do
        access_tokens = UserRefreshToken.all
        expect(access_tokens.length).to eq 2
        expect(access_tokens.map(&:id)).not_to include(token_already_expired.id)
      end
    end
  end

  describe "verifies the token is set" do
    let(:user_refresh_token) {FactoryBot.build :user_refresh_token}
    it "should set token before create" do
      expect(user_refresh_token.refresh_token).to be nil

      user_refresh_token.save
      expect(user_refresh_token.refresh_token).not_to be_empty
    end
  end
end
