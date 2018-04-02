namespace BigNumberTester
{
	partial class Form1
	{
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;

		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		/// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
		protected override void Dispose(bool disposing)
		{
			if (disposing && (components != null))
			{
				components.Dispose();
			}
			base.Dispose(disposing);
		}

		#region Windows Form Designer generated code

		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
			this.components = new System.ComponentModel.Container();
			this.CostUpgradeButton = new System.Windows.Forms.Button();
			this.AutoCollect = new System.Windows.Forms.CheckBox();
			this.TotalUpgradesLabel = new System.Windows.Forms.Label();
			this.label2 = new System.Windows.Forms.Label();
			this.BigNumberLabel = new System.Windows.Forms.Label();
			this.PurchaseMultiplier = new System.Windows.Forms.ComboBox();
			this.CollectingAmountLabel = new System.Windows.Forms.Label();
			this.TimeRemainingButton = new System.Windows.Forms.Button();
			this.tip = new System.Windows.Forms.ToolTip(this.components);
			this.timeRemainingTimer = new System.Windows.Forms.Timer(this.components);
			this.SuspendLayout();
			// 
			// CostUpgradeButton
			// 
			this.CostUpgradeButton.Location = new System.Drawing.Point(98, 53);
			this.CostUpgradeButton.Name = "CostUpgradeButton";
			this.CostUpgradeButton.Size = new System.Drawing.Size(75, 23);
			this.CostUpgradeButton.TabIndex = 0;
			this.CostUpgradeButton.Text = "999";
			this.CostUpgradeButton.UseVisualStyleBackColor = true;
			this.CostUpgradeButton.Click += new System.EventHandler(this.CostUpgradeButton_Click);
			// 
			// AutoCollect
			// 
			this.AutoCollect.AutoSize = true;
			this.AutoCollect.Location = new System.Drawing.Point(12, 57);
			this.AutoCollect.Name = "AutoCollect";
			this.AutoCollect.Size = new System.Drawing.Size(80, 17);
			this.AutoCollect.TabIndex = 1;
			this.AutoCollect.Text = "AutoCollect";
			this.AutoCollect.UseVisualStyleBackColor = true;
			this.AutoCollect.CheckedChanged += new System.EventHandler(this.AutoCollect_CheckedChanged);
			// 
			// TotalUpgradesLabel
			// 
			this.TotalUpgradesLabel.AutoSize = true;
			this.TotalUpgradesLabel.Location = new System.Drawing.Point(118, 79);
			this.TotalUpgradesLabel.Name = "TotalUpgradesLabel";
			this.TotalUpgradesLabel.Size = new System.Drawing.Size(30, 13);
			this.TotalUpgradesLabel.TabIndex = 2;
			this.TotalUpgradesLabel.Text = "x999";
			// 
			// label2
			// 
			this.label2.AutoSize = true;
			this.label2.Location = new System.Drawing.Point(29, 20);
			this.label2.Name = "label2";
			this.label2.Size = new System.Drawing.Size(43, 13);
			this.label2.TabIndex = 3;
			this.label2.Text = "Amount";
			// 
			// BigNumberLabel
			// 
			this.BigNumberLabel.AutoSize = true;
			this.BigNumberLabel.Location = new System.Drawing.Point(78, 20);
			this.BigNumberLabel.Name = "BigNumberLabel";
			this.BigNumberLabel.Size = new System.Drawing.Size(25, 13);
			this.BigNumberLabel.TabIndex = 3;
			this.BigNumberLabel.Text = "999";
			// 
			// PurchaseMultiplier
			// 
			this.PurchaseMultiplier.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
			this.PurchaseMultiplier.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.Suggest;
			this.PurchaseMultiplier.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
			this.PurchaseMultiplier.FormattingEnabled = true;
			this.PurchaseMultiplier.Items.AddRange(new object[] {
            "1",
            "10",
            "100",
            "MAX"});
			this.PurchaseMultiplier.Location = new System.Drawing.Point(445, 12);
			this.PurchaseMultiplier.Name = "PurchaseMultiplier";
			this.PurchaseMultiplier.Size = new System.Drawing.Size(80, 21);
			this.PurchaseMultiplier.TabIndex = 5;
			this.PurchaseMultiplier.Text = "1";
			this.PurchaseMultiplier.SelectedIndexChanged += new System.EventHandler(this.PurchaseMultiplier_SelectedIndexChanged);
			// 
			// CollectingAmountLabel
			// 
			this.CollectingAmountLabel.AutoSize = true;
			this.CollectingAmountLabel.Location = new System.Drawing.Point(199, 58);
			this.CollectingAmountLabel.Name = "CollectingAmountLabel";
			this.CollectingAmountLabel.Size = new System.Drawing.Size(25, 13);
			this.CollectingAmountLabel.TabIndex = 6;
			this.CollectingAmountLabel.Text = "999";
			// 
			// TimeRemainingButton
			// 
			this.TimeRemainingButton.Location = new System.Drawing.Point(445, 53);
			this.TimeRemainingButton.Name = "TimeRemainingButton";
			this.TimeRemainingButton.Size = new System.Drawing.Size(80, 23);
			this.TimeRemainingButton.TabIndex = 7;
			this.TimeRemainingButton.Text = "00:00:00.500";
			this.tip.SetToolTip(this.TimeRemainingButton, "click to start timer.");
			this.TimeRemainingButton.UseVisualStyleBackColor = true;
			this.TimeRemainingButton.Click += new System.EventHandler(this.TimeRemainingButton_Click);
			// 
			// Form1
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.ClientSize = new System.Drawing.Size(537, 110);
			this.Controls.Add(this.TimeRemainingButton);
			this.Controls.Add(this.CollectingAmountLabel);
			this.Controls.Add(this.PurchaseMultiplier);
			this.Controls.Add(this.BigNumberLabel);
			this.Controls.Add(this.label2);
			this.Controls.Add(this.TotalUpgradesLabel);
			this.Controls.Add(this.AutoCollect);
			this.Controls.Add(this.CostUpgradeButton);
			this.MaximumSize = new System.Drawing.Size(553, 149);
			this.MinimumSize = new System.Drawing.Size(553, 149);
			this.Name = "Form1";
			this.Text = "Big Number Tester";
			this.ResumeLayout(false);
			this.PerformLayout();

		}

		#endregion

		private System.Windows.Forms.Button CostUpgradeButton;
		private System.Windows.Forms.CheckBox AutoCollect;
		private System.Windows.Forms.Label TotalUpgradesLabel;
		private System.Windows.Forms.Label label2;
		private System.Windows.Forms.Label BigNumberLabel;
		private System.Windows.Forms.ComboBox PurchaseMultiplier;
		private System.Windows.Forms.Label CollectingAmountLabel;
		private System.Windows.Forms.Button TimeRemainingButton;
		private System.Windows.Forms.ToolTip tip;
		private System.Windows.Forms.Timer timeRemainingTimer;
	}
}

