<template>
  <div class="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen" lang="th">
    <header class="bg-inverse-surface text-inverse-on-surface">
      <div class="w-full px-margin-mobile md:px-margin-desktop">
        <div class="max-w-5xl mx-auto py-md flex items-center justify-between gap-base">
          <div class="flex items-center gap-sm">
            <div class="flex flex-col">
              <a class="font-headline-md text-headline-md text-primary-container uppercase tracking-wider hover:opacity-90 transition-opacity" href="/">MR.HANDSOME</a>
              <span class="font-label-sm text-label-sm px-base py-xs rounded bg-surface-container text-on-surface-variant uppercase tracking-wider">Tactical Range</span>
            </div>
          </div>
          <span class="inline-flex items-center gap-xs px-base py-xs rounded-full bg-primary-container/20 text-primary-container font-label-sm text-label-sm font-semibold uppercase tracking-wider">
            <span class="material-symbols-outlined text-[16px]">qr_code_2</span>ช่องทางชำระเงิน
          </span>
        </div>
      </div>
    </header>

    <main class="w-full px-margin-mobile md:px-margin-desktop py-lg">
      <div class="max-w-5xl mx-auto">
        <!-- Draft Notice -->
        <div class="flex items-start gap-sm bg-primary-container/15 border border-primary-container/40 rounded-xl p-sm mb-md">
          <span class="material-symbols-outlined text-primary text-[20px] mt-0.5">info</span>
          <p class="font-label-md text-label-md text-on-primary-container">
            หน้าแบบร่าง (Draft) — กำลังใช้ QR Code จำลอง สำหรับใช้งานจริงให้นำไฟล์รูปมาวางที่ <code class="font-mono font-bold">public/img/qr-shop.png</code>
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-md items-stretch">
          <!-- QR card -->
          <section class="bg-surface-container-lowest shadow-sm border border-outline-variant rounded-xl p-md flex flex-col items-center text-center gap-md">
            <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">QR Code ชำระเงิน / PromptPay</span>
            <div class="bg-white border border-outline-variant rounded-xl p-sm shadow-sm flex items-center justify-center">
              <!-- แสดง QR Code จำลอง (Draft SVG) ที่เพื่อนทำไว้ -->
              <div class="w-56 h-56 md:w-64 md:h-64 flex items-center justify-center rounded-lg">
                <svg viewBox="0 0 200 200" class="w-full h-full" role="img" aria-label="QR Code placeholder">
                  <rect width="200" height="200" fill="#ffffff"/>
                  <g fill="#1a1a1a">
                    <rect x="10" y="10" width="44" height="44"/>
                    <rect x="24" y="24" width="16" height="16" fill="#ffffff"/>
                    <rect x="146" y="10" width="44" height="44"/>
                    <rect x="160" y="24" width="16" height="16" fill="#ffffff"/>
                    <rect x="10" y="146" width="44" height="44"/>
                    <rect x="24" y="160" width="16" height="16" fill="#ffffff"/>
                    <rect x="70" y="20" width="12" height="12"/>
                    <rect x="94" y="20" width="12" height="12"/>
                    <rect x="122" y="20" width="12" height="12"/>
                    <rect x="70" y="48" width="12" height="12"/>
                    <rect x="122" y="48" width="12" height="12"/>
                    <rect x="20" y="70" width="12" height="12"/>
                    <rect x="44" y="70" width="12" height="12"/>
                    <rect x="68" y="70" width="12" height="12"/>
                    <rect x="122" y="70" width="12" height="12"/>
                    <rect x="146" y="70" width="12" height="12"/>
                    <rect x="168" y="70" width="12" height="12"/>
                    <rect x="20" y="94" width="12" height="12"/>
                    <rect x="68" y="94" width="12" height="12"/>
                    <rect x="94" y="94" width="12" height="12"/>
                    <rect x="168" y="94" width="12" height="12"/>
                    <rect x="20" y="118" width="12" height="12"/>
                    <rect x="44" y="118" width="12" height="12"/>
                    <rect x="94" y="118" width="12" height="12"/>
                    <rect x="122" y="118" width="12" height="12"/>
                    <rect x="146" y="118" width="12" height="12"/>
                    <rect x="94" y="146" width="12" height="12"/>
                    <rect x="122" y="146" width="12" height="12"/>
                    <rect x="146" y="146" width="12" height="12"/>
                    <rect x="168" y="146" width="12" height="12"/>
                    <rect x="20" y="168" width="12" height="12"/>
                    <rect x="68" y="168" width="12" height="12"/>
                    <rect x="94" y="168" width="12" height="12"/>
                    <rect x="146" y="168" width="12" height="12"/>
                    <text x="100" y="132" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="700" fill="#FFD700">QR</text>
                    <text x="100" y="151" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#1a1a1a">DRAFT</text>
                  </g>
                </svg>
              </div>
            </div>
            <span class="inline-flex items-center gap-xs">
              <span class="material-symbols-outlined text-primary text-[16px]">qr_code_scanner</span>
              <span class="font-label-md text-label-md text-on-surface-variant">สแกนเพื่อชำระเงิน</span>
            </span>
          </section>

          <!-- ข้อมูลบัญชี card -->
          <section class="bg-surface-container-lowest shadow-sm border border-outline-variant rounded-xl p-md flex flex-col gap-sm">
            <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">รายละเอียดบัญชีรับเงิน</span>
            <div class="flex items-center justify-between gap-base bg-surface-container-low rounded-lg px-sm py-base">
              <span class="font-body-md text-body-md text-on-surface-variant">หมายเลข PromptPay</span>
              <span class="font-mono font-bold text-on-surface">090-000-0000 <span class="font-label-sm text-label-sm text-on-surface-variant font-normal">(รอแจ้งจริงจากทางร้าน)</span></span>
            </div>
            <div class="flex items-center justify-between gap-base bg-surface-container-low rounded-lg px-sm py-base">
              <span class="font-body-md text-body-md text-on-surface-variant">ชื่อบัญชี</span>
              <span class="font-bold text-on-surface">MR.HANDSOME Archery Club <span class="font-label-sm text-label-sm text-on-surface-variant font-normal">(รอยืนยัน)</span></span>
            </div>
            <div class="flex items-center justify-between gap-base bg-surface-container-low rounded-lg px-sm py-base">
              <span class="font-body-md text-body-md text-on-surface-variant">วัน-เวลารับชำระ</span>
              <span class="font-bold text-on-surface">ทุกวัน 11:00 - 18:30 น.</span>
            </div>
            <div class="flex items-center justify-between gap-base bg-surface-container-low rounded-lg px-sm py-base">
              <span class="font-body-md text-body-md text-on-surface-variant">สอบถามเพิ่มเติม</span>
              <span class="font-bold text-on-surface">02-789-4321 / 081-987-6543</span>
            </div>
            <div class="mt-auto pt-sm flex items-center gap-xs">
              <span class="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
              <span class="font-label-sm text-label-sm text-on-surface-variant">ชำระหน้าร้านหรือสแกน QR ได้ทันที — อัปเดตไฟล์ QR จริงเมื่อทางร้านส่งให้</span>
            </div>
          </section>
        </div>
      </div>
    </main>

    <footer class="w-full bg-inverse-surface text-inverse-on-surface py-lg">
      <div class="w-full px-margin-mobile md:px-margin-desktop">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-md pb-md">
          <div class="flex flex-col gap-xs">
            <div class="flex items-center gap-sm">
              <span class="font-headline-md text-headline-md text-primary-container uppercase tracking-wider">MR.HANDSOME</span>
              <span class="font-label-sm text-label-sm px-base py-xs rounded bg-surface-container text-on-surface-variant uppercase tracking-wider">Tactical Range</span>
            </div>
            <p class="font-body-md text-body-md text-secondary-fixed-dim max-w-sm">ศูนย์ฝึกและสนามยิงธนูสไตล์ Modern Tactical สำหรับนักกีฬาระดับมืออาชีพและผู้ฝึกซ้อมเพื่อความแม่นยำสูงสุด</p>
          </div>
        </div>
        <div class="mt-md pt-md flex flex-col sm:flex-row justify-between items-center gap-base font-label-sm text-label-sm text-secondary-fixed-dim">
          <p>© 2026 MR.HANDSOME Archery Club. Precision & Power. All rights reserved.</p>
          <div class="flex gap-md"><span class="uppercase tracking-widest text-primary-container">Precision Calibrated</span></div>
        </div>
      </div>
    </footer>
  </div>
</template>