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
			if(!AutoCollect.Checked && timeRemainingTimer.Enabled)
			{

			}
		}
	}
}
