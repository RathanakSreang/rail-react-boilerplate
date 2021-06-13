require "rails_helper"

RSpec.describe User, type: :model do
  context "associations" do
    it { should have_many(:user_refresh_tokens).dependent(:destroy) }
  end

  context "validations" do
    it { should validate_presence_of(:name) }
    it { should validate_length_of(:name).is_at_most(80) }
    it { should validate_presence_of(:email) }
    it { should validate_length_of(:email).is_at_most(255) }
    it { should validate_uniqueness_of(:email) }

    context "email" do
      context "invalid format" do
        it "should invalid user" do
          user = FactoryBot.build :user
          expect(user.valid?).to eq true

          invalid_addresses = %w[user@example,com user_at_foo.org user.name@example.
            foo@bar_baz.com foo@bar+baz.com]
          invalid_addresses.each do |invalid_address|
            user.email = invalid_address
            expect(user.valid?).to eq false
          end
        end
      end

      context "valid format" do
        it "should valid user" do
          user = FactoryBot.build :user
          expect(user.valid?).to eq true

          valid_addresses = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org
            first.last@foo.jp alice+bob@baz.cn]
          valid_addresses.each do |valid_address|
            user.email = valid_address
            expect(user.valid?).to eq true
          end
        end
      end
    end
  end

  describe "#generate_auth!" do
    let(:user) {FactoryBot.create :user}
    it "should create user's access token" do
      expect {user.generate_auth}.to change{UserRefreshToken.count}.by(1)
    end

    it "should return token" do
      token = user.generate_auth[:refresh_token]
      expect(user.user_refresh_tokens.map(&:refresh_token)).to include(token)
    end
  end
end
