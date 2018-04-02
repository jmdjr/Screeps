using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace BigNumberTester
{
	public partial class Form1 : Form
	{
		// value type to handle the large amount of numbers

		float number = 0;
		int numberOfUpgrades = 0;
		float baseCostOfUpgrade = 1.0f;
		float costForNextUpgrade = 1.0f;
		float baseCollectingAmount = 1.0f;

		float upgradeMultiplier = 1.01f;
		float collectingMutliplier = 1.001f;

		TimeSpan totalTime = new TimeSpan(0, 0, 0, 0, 500);
		TimeSpan remainingTime = new TimeSpan();


		public float CostForNextUpgrade()
		{
			return baseCostOfUpgrade * (float)Math.Pow(upgradeMultiplier, numberOfUpgrades);
		}

		public float CollectingAmount()
		{
			return baseCollectingAmount * (float)Math.Pow(collectingMutliplier, numberOfUpgrades);
		}

		public void updateNumber()
		{
			BigNumberLabel.Text = number.ToString();
		}

		public void updateUpgrades()
		{
			TotalUpgradesLabel.Text = numberOfUpgrades.ToString();
		}
		public void updateUpgradeCost()
		{
			CostUpgradeButton.Text = CostForNextUpgrade().ToString();
		}

		public void updateCollectingAmount()
		{
			CollectingAmountLabel.Text = CollectingAmount().ToString();
		}

		public void updateClock()
		{
			TimeRemainingButton.Text = remainingTime.ToString();
		}

		public void resetClock()
		{
			remainingTime = totalTime;
		}

		public Form1()
		{
			InitializeComponent();
			resetClock();
			updateClock();
			updateNumber();
			updateUpgrades();
			updateUpgradeCost();
			updateCollectingAmount();
		}

		private void PurchaseMultiplier_SelectedIndexChanged(object sender, EventArgs e)
		{

		}

		private void CostUpgradeButton_Click(object sender, EventArgs e)
		{

		}

		private void AutoCollect_CheckedChanged(object sender, EventArgs e)
		{

		}

		private void TimeRemainingButton_Click(object sender, EventArgs e)
		{
			if(!AutoCollect.Checked && !timeRemainingTimer.Enabled)
			{
				timeRemainingTimer.Enabled = true;
			}
		}

		TimeSpan tickOff = new TimeSpan(0, 0, 0, 0, 100);

		private void timeRemainingTimer_Tick(object sender, EventArgs e)
		{
			if(remainingTime.Ticks > 0)
			{
				remainingTime = remainingTime.Subtract(tickOff);
				updateClock();
			}
			else
			{
				number += CollectingAmount();
				updateNumber();
				resetClock();
				updateClock();
				timeRemainingTimer.Enabled = false;
			}
		}
	}
}
