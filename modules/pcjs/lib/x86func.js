/**
 * @fileoverview Implements PCjs 8086 opcode helpers.
 * @author <a href="mailto:Jeff@pcjs.org">Jeff Parsons</a>
 * @version 1.0
 * Created 2012-Sep-05
 *
 * Copyright © 2012-2015 Jeff Parsons <Jeff@pcjs.org>
 *
 * This file is part of PCjs, which is part of the JavaScript Machines Project (aka JSMachines)
 * at <http://jsmachines.net/> and <http://pcjs.org/>.
 *
 * PCjs is free software: you can redistribute it and/or modify it under the terms of the
 * GNU General Public License as published by the Free Software Foundation, either version 3
 * of the License, or (at your option) any later version.
 *
 * PCjs is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with PCjs.  If not,
 * see <http://www.gnu.org/licenses/gpl.html>.
 *
 * You are required to include the above copyright notice in every source code file of every
 * copy or modified version of this work, and to display that copyright notice on every screen
 * that loads or runs any version of this software (see Computer.sCopyright).
 *
 * Some PCjs files also attempt to load external resource files, such as character-image files,
 * ROM files, and disk image files. Those external resource files are not considered part of the
 * PCjs program for purposes of the GNU General Public License, and the author does not claim
 * any copyright as to their contents.
 */

"use strict";

if (typeof module !== 'undefined') {
    var Messages    = require("./messages");
    var X86         = require("./x86");
}

/**
 * fnADCb(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnADCb = function ADCb(dst, src)
{
    var b = (dst + src + this.getCarry())|0;
    this.setArithResult(dst, src, b, X86.RESULT.BYTE | X86.RESULT.ALL);
    this.nStepCycles -= (this.regEAWrite === X86.ADDR_INVALID? (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesArithRR : this.CYCLES.nOpCyclesArithRM) : this.CYCLES.nOpCyclesArithMR);
    return b & 0xff;
};

/**
 * fnADCw(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnADCw = function ADCw(dst, src)
{
    var w = (dst + src + this.getCarry())|0;
    this.setArithResult(dst, src, w, X86.RESULT.WORD | X86.RESULT.ALL);
    this.nStepCycles -= (this.regEAWrite === X86.ADDR_INVALID? (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesArithRR : this.CYCLES.nOpCyclesArithRM) : this.CYCLES.nOpCyclesArithMR);
    return w & 0xffff;
};

/**
 * fnADDb(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnADDb = function ADDb(dst, src)
{
    var b = (dst + src)|0;
    this.setArithResult(dst, src, b, X86.RESULT.BYTE | X86.RESULT.ALL);
    this.nStepCycles -= (this.regEAWrite === X86.ADDR_INVALID? (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesArithRR : this.CYCLES.nOpCyclesArithRM) : this.CYCLES.nOpCyclesArithMR);
    return b & 0xff;
};

/**
 * fnADDw(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnADDw = function ADDw(dst, src)
{
    var w = (dst + src)|0;
    this.setArithResult(dst, src, w, X86.RESULT.WORD | X86.RESULT.ALL);
    this.nStepCycles -= (this.regEAWrite === X86.ADDR_INVALID? (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesArithRR : this.CYCLES.nOpCyclesArithRM) : this.CYCLES.nOpCyclesArithMR);
    return w & 0xffff;
};

/**
 * fnANDb(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnANDb = function ANDb(dst, src)
{
    var b = dst & src;
    this.setLogicResult(b, X86.RESULT.BYTE);
    this.nStepCycles -= (this.regEAWrite === X86.ADDR_INVALID? (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesArithRR : this.CYCLES.nOpCyclesArithRM) : this.CYCLES.nOpCyclesArithMR);
    return b;
};

/**
 * fnANDw(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnANDw = function ANDw(dst, src)
{
    var w = dst & src;
    this.setLogicResult(w, X86.RESULT.WORD);
    this.nStepCycles -= (this.regEAWrite === X86.ADDR_INVALID? (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesArithRR : this.CYCLES.nOpCyclesArithRM) : this.CYCLES.nOpCyclesArithMR);
    return w;
};

/**
 * fnANDd(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnANDd = function ANDd(dst, src)
{
    this.nStepCycles -= (this.regEAWrite === X86.ADDR_INVALID? (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesArithRR : this.CYCLES.nOpCyclesArithRM) : this.CYCLES.nOpCyclesArithMR);
    return this.setLogicResult(dst & src, X86.RESULT.DWORD);
};

/**
 * fnARPL(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnARPL = function ARPL(dst, src)
{
    this.nStepCycles -= (10 + (this.regEA === X86.ADDR_INVALID? 0 : 1));
    if ((dst & X86.SEL.RPL) < (src & X86.SEL.RPL)) {
        dst = (dst & ~X86.SEL.RPL) | (src & X86.SEL.RPL);
        this.setZF();
        return dst;
    }
    this.clearZF();
    return dst;
};

/**
 * fnBOUND(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnBOUND = function BOUND(dst, src)
{
    if (this.regEA === X86.ADDR_INVALID) {
        /*
         * Generate UD_FAULT (INT 0x06: Invalid Opcode) if src is not a memory operand.
         */
        X86.opInvalid.call(this);
        return dst;
    }
    /*
     * Note that BOUND performs signed comparisons, so we must transform all arguments into signed values.
     */
    var wIndex = (dst << 16) >> 16;
    var wLower = (this.getShort(this.regEA) << 16) >> 16;
    var wUpper = (this.getShort(this.regEA + 2) << 16) >> 16;
    this.nStepCycles -= this.CYCLES.nOpCyclesBound;
    if (wIndex < wLower || wIndex > wUpper) {
        /*
         * The INT 0x05 handler must be called with CS:IP pointing to the BOUND instruction.
         *
         * TODO: Determine the cycle cost when a BOUND exception is triggered, over and above nOpCyclesBound.
         */
        this.setIP(this.opLIP - this.segCS.base);
        X86.fnINT.call(this, X86.EXCEPTION.BOUND_ERR, null, 0);
    }
    this.opFlags |= X86.OPFLAG.NOWRITE;
    return dst;
};

/**
 * fnCALLw(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnCALLw = function CALLw(dst, src)
{
    this.pushWord(this.getIP());
    this.setIP(dst);
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesCallWR : this.CYCLES.nOpCyclesCallWM);
    this.opFlags |= X86.OPFLAG.NOWRITE;
    return dst;
};

/**
 * fnCALLF(off, sel)
 *
 * For protected-mode, this function must attempt to load the new code segment first, because if the new segment
 * requires a change in privilege level, the return address must be pushed on the NEW stack, not the current stack.
 *
 * @this {X86CPU}
 * @param {number} off
 * @param {number} sel
 */
X86.fnCALLF = function CALLF(off, sel)
{
    var regCS = this.getCS();
    var regEIP = this.getIP();
    if (this.setCSIP(off, sel, true) != null) {
        this.pushWord(regCS);
        this.pushWord(regEIP);
    }
};

/**
 * fnCALLFdw(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnCALLFdw = function CALLFdw(dst, src)
{
    if (this.regEA === X86.ADDR_INVALID) {
        return X86.fnGRPUndefined.call(this, dst, src);
    }
    X86.fnCALLF.call(this, dst, this.getShort(this.regEA + 2));
    this.nStepCycles -= this.CYCLES.nOpCyclesCallDM;
    this.opFlags |= X86.OPFLAG.NOWRITE;
    return dst;
};

/**
 * fnCMPb(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number} dst unchanged
 */
X86.fnCMPb = function CMPb(dst, src)
{
    var b = (dst - src)|0;
    this.setArithResult(dst, src, b, X86.RESULT.BYTE | X86.RESULT.ALL, true);
    this.nStepCycles -= (this.regEAWrite === X86.ADDR_INVALID? (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesArithRR : this.CYCLES.nOpCyclesCompareRM) : this.CYCLES.nOpCyclesArithRM);
    this.opFlags |= X86.OPFLAG.NOWRITE;
    return dst;
};

/**
 * fnCMPw(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number} dst unchanged
 */
X86.fnCMPw = function CMPw(dst, src)
{
    var w = (dst - src)|0;
    this.setArithResult(dst, src, w, X86.RESULT.WORD | X86.RESULT.ALL, true);
    this.nStepCycles -= (this.regEAWrite === X86.ADDR_INVALID? (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesArithRR : this.CYCLES.nOpCyclesCompareRM) : this.CYCLES.nOpCyclesArithRM);
    this.opFlags |= X86.OPFLAG.NOWRITE;
    return dst;
};

/**
 * fnDECb(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnDECb = function DECb(dst, src)
{
    var b = (dst - 1)|0;
    this.setArithResult(dst, 1, b, X86.RESULT.BYTE | X86.RESULT.NOTCF, true);
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesIncR : this.CYCLES.nOpCyclesIncM);
    return b & 0xff;
};

/**
 * fnDECr(w)
 *
 * @this {X86CPU}
 * @param {number} w
 * @return {number}
 */
X86.fnDECr = function DECr(w)
{
    var result = ((w & this.dataMask) - 1)|0;
    this.setArithResult(w, 1, result, X86.RESULT.WORD | X86.RESULT.NOTCF, true);
    this.nStepCycles -= 2;                          // the register form of INC takes 2 cycles on all CPUs
    return (w & ~this.dataMask) | (result & this.dataMask);
};

/**
 * fnDECw(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnDECw = function DECw(dst, src)
{
    var w = (dst - 1)|0;
    this.setArithResult(dst, 1, w, X86.RESULT.WORD | X86.RESULT.NOTCF, true);
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesIncR : this.CYCLES.nOpCyclesIncM);
    return w & 0xffff;
};

/**
 * fnDIVb(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number} (we return dst unchanged, since it's actually AX that's modified)
 */
X86.fnDIVb = function DIVb(dst, src)
{
    /*
     * Detect zero divisor
     */
    if (!dst) {
        X86.fnDIVOverflow.call(this);
        return dst;
    }
    /*
     * Detect small divisor (quotient overflow)
     */
    var uQuotient = ((src = this.regEAX) / dst);
    if (uQuotient > 0xff) {
        X86.fnDIVOverflow.call(this);
        return dst;
    }
    this.regMD16 = this.regEAX = (uQuotient & 0xff) | (((this.regEAX % dst) & 0xff) << 8);
    /*
     * Multiply/divide instructions specify only a single operand, which the decoders pass to us
     * via the dst parameter, so we set src to the other implied operand (either AX or DX:AX).
     * However, src is technically an output, and dst is merely an input (which is why we must return
     * dst unchanged). So, to make traceLog() more consistent, we reverse the order of dst and src.
     */
    if (DEBUG && DEBUGGER) this.traceLog('DIVB', src, dst, null, this.getPS(), this.regMD16);
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesDivBR : this.CYCLES.nOpCyclesDivBM);
    this.opFlags |= X86.OPFLAG.NOWRITE;
    return dst;
};

/**
 * fnDIVw(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number} (we return dst unchanged, since it's actually DX:AX that's modified)
 */
X86.fnDIVw = function DIVw(dst, src)
{
    /*
     * Detect zero divisor
     */
    if (!dst) {
        X86.fnDIVOverflow.call(this);
        return dst;
    }
    /*
     * Detect small divisor (quotient overflow)
     *
     * WARNING: We CANNOT simply do "src = (this.regEDX << 16) | this.regEAX", because if bit 15 of DX
     * is set, JavaScript will create a negative 32-bit number.  So we instead use non-bit-wise operators
     * to force JavaScript to create a floating-point value that won't suffer from 32-bit-math side-effects.
     */
    src = this.regEAX + this.regEDX * 0x10000;
    var uQuotient = Math.floor(src / dst);
    if (uQuotient >= 0x10000) {
        X86.fnDIVOverflow.call(this);
        return dst;
    }
    this.regMD16 = this.regEAX = (uQuotient & 0xffff);
    this.regMD32 = this.regEDX = (src % dst) & 0xffff;
    /*
     * Multiply/divide instructions specify only a single operand, which the decoders pass to us
     * via the dst parameter, so we set src to the other implied operand (either AX or DX:AX).
     * However, src is technically an output, and dst is merely an input (which is why we must return
     * dst unchanged). So, to make traceLog() more consistent, we reverse the order of dst and src.
     */
    if (DEBUG && DEBUGGER) this.traceLog('DIVW', src, dst, null, this.getPS(), this.regMD16 | (this.regMD32 << 16));
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesDivWR : this.CYCLES.nOpCyclesDivWM);
    this.opFlags |= X86.OPFLAG.NOWRITE;
    return dst;
};

/**
 * fnESC(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number} dst unchanged
 */
X86.fnESC = function ESC(dst, src)
{
    return dst;
};

/**
 * fnIDIVb(dst, src)
 *
 * TODO: Implement the following difference, from "AP-186: Introduction to the 80186 Microprocessor, March 1983":
 *
 *      "The 8086 will cause a divide error whenever the absolute value of the quotient is greater then 7FFFH
 *      (for word operations) or if the absolute value of the quotient is greater than 7FH (for byte operations).
 *      The 80186 has expanded the range of negative numbers allowed as a quotient by 1 to include 8000H and 80H.
 *      These numbers represent the most negative numbers representable using 2's complement arithmetic (equaling
 *      -32768 and -128 in decimal, respectively)."
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number} (we return dst unchanged, since it's actually AX that's modified)
 */
X86.fnIDIVb = function IDIVb(dst, src)
{
    /*
     * Detect zero divisor
     */
    if (!dst) {
        X86.fnDIVOverflow.call(this);
        return dst;
    }
    /*
     * Detect small divisor (quotient overflow)
     */
    var lQuotient = ((((src = this.regEAX) << 16) >> 16) / ((dst << 24) >> 24));
    if (lQuotient > ((lQuotient << 24) >> 24) & 0xffff) {
        X86.fnDIVOverflow.call(this);
        return dst;
    }
    this.regMD16 = this.regEAX = (lQuotient & 0xff) | (((((this.regEAX << 16) >> 16) % ((dst << 24) >> 24)) & 0xff) << 8);
    /*
     * Multiply/divide instructions specify only a single operand, which the decoders pass to us
     * via the dst parameter, so we set src to the other implied operand (either AX or DX:AX).
     * However, src is technically an output, and dst is merely an input (which is why we must return
     * dst unchanged). So, to make traceLog() more consistent, we reverse the order of dst and src.
     */
    if (DEBUG && DEBUGGER) this.traceLog('IDIVB', src, dst, null, this.getPS(), this.regMD16);
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesIDivBR : this.CYCLES.nOpCyclesIDivBM);
    this.opFlags |= X86.OPFLAG.NOWRITE;
    return dst;
};

/**
 * fnIDIVw(dst, src)
 *
 * TODO: Implement the following difference, from "AP-186: Introduction to the 80186 Microprocessor, March 1983":
 *
 *      "The 8086 will cause a divide error whenever the absolute value of the quotient is greater then 7FFFH
 *      (for word operations) or if the absolute value of the quotient is greater than 7FH (for byte operations).
 *      The 80186 has expanded the range of negative numbers allowed as a quotient by 1 to include 8000H and 80H.
 *      These numbers represent the most negative numbers representable using 2's complement arithmetic (equaling
 *      -32768 and -128 in decimal, respectively)."
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number} (we return dst unchanged, since it's actually DX:AX that's modified)
 */
X86.fnIDIVw = function IDIVw(dst, src)
{
    /*
     * Detect zero divisor
     */
    if (!dst) {
        X86.fnDIVOverflow.call(this);
        return dst;
    }
    /*
     * Detect small divisor (quotient overflow)
     */
    var lDivisor = ((dst << 16) >> 16);
    src = (this.regEDX << 16) | this.regEAX;
    var lQuotient = Math.floor(src / lDivisor);
    if (lQuotient != ((lQuotient & 0xffff) << 16) >> 16) {
        X86.fnDIVOverflow.call(this);
        return dst;
    }
    this.regMD16 = this.regEAX = (lQuotient & 0xffff);
    this.regMD32 = this.regEDX = (src % lDivisor) & 0xffff;
    /*
     * Multiply/divide instructions specify only a single operand, which the decoders pass to us
     * via the dst parameter, so we set src to the other implied operand (either AX or DX:AX).
     * However, src is technically an output, and dst is merely an input (which is why we must return
     * dst unchanged). So, to make traceLog() more consistent, we reverse the order of dst and src.
     */
    if (DEBUG && DEBUGGER) this.traceLog('IDIVW', src, dst, null, this.getPS(), this.regMD16 | (this.regMD32 << 16));
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesIDivWR : this.CYCLES.nOpCyclesIDivWM);
    this.opFlags |= X86.OPFLAG.NOWRITE;
    return dst;
};

/**
 * fnIMUL8(dst, src)
 *
 * 80286_and_80287_Programmers_Reference_Manual_1987.pdf, p.B-44 (p.254) notes that:
 *
 *      "The low 16 bits of the product of a 16-bit signed multiply are the same as those of an
 *      unsigned multiply. The three operand IMUL instruction can be used for unsigned operands as well."
 *
 * However, we still sign-extend the operands before multiplying, making it easier to range-check the result.
 *
 * (80186/80188 and up)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnIMUL8 = function IMUL8(dst, src)
{
    var result = ((src << 16) >> 16) * ((this.getIPByte() << 24) >> 24);
    if (result > 32767 || result < -32768) {
        this.setCF(); this.setOF();
    } else {
        this.clearCF(); this.clearOF();
    }
    result &= 0xffff;
    if (DEBUG && DEBUGGER) this.traceLog('IMUL8', dst, src, null, this.getPS(), result);
    /*
     * NOTE: These are the cycle counts for the 80286; the 80186/80188 have slightly different values (ranges):
     * 22-25 and 29-32 instead of 21 and 24, respectively.  However, accurate cycle counts for the 80186/80188 is
     * not super-critical. TODO: Fix this someday.
     */
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? 21 : 24);
    return result;
};

/**
 * fnIMUL16(dst, src)
 *
 * 80286_and_80287_Programmers_Reference_Manual_1987.pdf, p.B-44 (p.254) notes that:
 *
 *      "The low 16 bits of the product of a 16-bit signed multiply are the same as those of an
 *      unsigned multiply. The three operand IMUL instruction can be used for unsigned operands as well."
 *
 * However, we still sign-extend the operands before multiplying, making it easier to range-check the result.
 *
 * (80186/80188 and up)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnIMUL16 = function IMUL16(dst, src)
{
    var result = ((src << 16) >> 16) * ((this.getIPWord() << 16) >> 16);
    if (result > 32767 || result < -32768) {
        this.setCF(); this.setOF();
    } else {
        this.clearCF(); this.clearOF();
    }
    result &= 0xffff;
    if (DEBUG && DEBUGGER) this.traceLog('IMUL16', dst, src, null, this.getPS(), result);
    /*
     * NOTE: These are the cycle counts for the 80286; the 80186/80188 have slightly different values (ranges):
     * 22-25 and 29-32 instead of 21 and 24, respectively.  However, accurate cycle counts for the 80186/80188 is
     * not super-critical. TODO: Fix this someday.
     */
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? 21 : 24);
    return result;
};

/**
 * fnIMULb(dst, src)
 *
 * This 16-bit multiplication must indicate when the upper 8 bits are simply a sign-extension of the
 * lower 8 bits (carry clear) and when the upper 8 bits contain significant bits (carry set).  The latter
 * will occur whenever a positive result is > 127 (0x007f) and whenever a negative result is < -128
 * (0xff80).
 *
 * Example 1: 16 * 4 = 64 (0x0040): carry is clear
 * Example 2: 16 * 8 = 128 (0x0080): carry is set (the sign bit no longer fits in the lower 8 bits)
 * Example 3: 16 * -8 (0xf8) = -128 (0xff80): carry is clear (the sign bit *still* fits in the lower 8 bits)
 * Example 4: 16 * -16 (0xf0) = -256 (0xff00): carry is set (the sign bit no longer fits in the lower 8 bits)
 *
 * An earlier version of this function assumed it simply needed to check bit 7 of the result to determine carry,
 * which was completely broken.
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number} (we return dst unchanged, since it's actually AX that's modified)
 */
X86.fnIMULb = function IMULb(dst, src)
{
    var result = (((src = this.regEAX) << 24) >> 24) * ((dst << 24) >> 24);
    this.regEAX = this.regMD16 = result & 0xffff;
    if (result > 127 || result < -128) {
        this.setCF(); this.setOF();
    } else {
        this.clearCF(); this.clearOF();
    }
    /*
     * Multiply/divide instructions specify only a single operand, which the decoders pass to us
     * via the dst parameter, so we set src to the other implied operand (either AX or DX:AX).
     * However, src is technically an output, and dst is merely an input (which is why we must return
     * dst unchanged). So, to make traceLog() more consistent, we reverse the order of dst and src.
     */
    if (DEBUG && DEBUGGER) this.traceLog('IMULB', src, dst, null, this.getPS(), this.regMD16);
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesIMulBR : this.CYCLES.nOpCyclesIMulBM);
    this.opFlags |= X86.OPFLAG.NOWRITE;
    return dst;
};

/**
 * fnIMULw(dst, src)
 *
 * This 32-bit multiplication must indicate when the upper 16 bits are simply a sign-extension of the
 * lower 16 bits (carry clear) and when the upper 16 bits contain significant bits (carry set).  The latter
 * will occur whenever a positive result is > 32767 (0x00007fff) and whenever a negative result is < -32768
 * (0xffff8000).
 *
 * Example 1: 256 * 64 = 16384 (0x00004000): carry is clear
 * Example 2: 256 * 128 = 32768 (0x00008000): carry is set (the sign bit no longer fits in the lower 16 bits)
 * Example 3: 256 * -128 (0xff80) = -32768 (0xffff8000): carry is clear (the sign bit *still* fits in the lower 16 bits)
 * Example 4: 256 * -256 (0xff00) = -65536 (0xffff0000): carry is set (the sign bit no longer fits in the lower 16 bits)
 *
 * An earlier version of this function assumed it simply needed to check bit 15 of the result to determine carry,
 * which was completely broken.
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number} (we return dst unchanged, since it's actually DX:AX that's modified)
 */
X86.fnIMULw = function IMULw(dst, src)
{
    var result = (((src = this.regEAX) << 16) >> 16) * ((dst << 16) >> 16);
    this.regEAX = this.regMD16 = result & 0xffff;
    this.regEDX = this.regMD32 = (result >> 16) & 0xffff;
    if (result > 32767 || result < -32768) {
        this.setCF(); this.setOF();
    } else {
        this.clearCF(); this.clearOF();
    }
    /*
     * Multiply/divide instructions specify only a single operand, which the decoders pass to us
     * via the dst parameter, so we set src to the other implied operand (either AX or DX:AX).
     * However, src is technically an output, and dst is merely an input (which is why we must return
     * dst unchanged). So, to make traceLog() more consistent, we reverse the order of dst and src.
     */
    if (DEBUG && DEBUGGER) this.traceLog('IMULW', src, dst, null, this.getPS(), this.regMD16 | (this.regMD32 << 16));
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesIMulWR : this.CYCLES.nOpCyclesIMulWM);
    this.opFlags |= X86.OPFLAG.NOWRITE;
    return dst;
};

/**
 * fnINCb(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnINCb = function INCb(dst, src)
{
    var b = (dst + 1)|0;
    this.setArithResult(dst, 1, b, X86.RESULT.BYTE | X86.RESULT.NOTCF);
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesIncR : this.CYCLES.nOpCyclesIncM);
    return b & 0xff;
};

/**
 * fnINCr(w)
 *
 * @this {X86CPU}
 * @param {number} w
 * @return {number}
 */
X86.fnINCr = function INCr(w)
{
    var result = ((w & this.dataMask) + 1)|0;
    this.setArithResult(w, 1, result, X86.RESULT.WORD | X86.RESULT.NOTCF);
    this.nStepCycles -= 2;                          // the register form of INC takes 2 cycles on all CPUs
    return (w & ~this.dataMask) | (result & this.dataMask);
};

/**
 * fnINCw(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnINCw = function INCw(dst, src)
{
    var w = (dst + 1)|0;
    this.setArithResult(dst, 1, w, X86.RESULT.WORD | X86.RESULT.NOTCF);
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesIncR : this.CYCLES.nOpCyclesIncM);
    return w & 0xffff;
};

/**
 * fnINT(nIDT, nError, nCycles)
 *
 * NOTE: We no longer use setCSIP(), because it always loads the new CS using segCS.load(), which
 * only knows how to load GDT and LDT descriptors, whereas interrupts must use setCS.loadIDT(), which
 * deals exclusively with IDT descriptors.
 *
 * This means we must take care to replicate critical features of setCSIP(); eg, setting segCS.fCall before
 * calling loadIDT(), updating LIP, and flushing the prefetch queue.
 *
 * @this {X86CPU}
 * @param {number} nIDT
 * @param {number|null|undefined} nError
 * @param {number} nCycles (in addition to the default of nOpCyclesInt)
 */
X86.fnINT = function INT(nIDT, nError, nCycles)
{
    /*
     * TODO: We assess the cycle cost up front, because otherwise, if loadIDT() fails, no cost may be assessed.
     */
    this.nStepCycles -= this.CYCLES.nOpCyclesInt + nCycles;
    this.segCS.fCall = true;
    var regPS = this.getPS();
    var regCS = this.getCS();
    var regEIP = this.getIP();
    var addr = this.segCS.loadIDT(nIDT);
    if (addr != X86.ADDR_INVALID) {
        this.regLIP = addr;
        if (PREFETCH) this.flushPrefetch(this.regLIP);
        this.pushWord(regPS);
        this.pushWord(regCS);
        this.pushWord(regEIP);
        if (nError != null) this.pushWord(nError);
        this.nFault = -1;
    }
};

/**
 * fnIRET()
 *
 * @this {X86CPU}
 */
X86.fnIRET = function IRET()
{
    /*
     * TODO: We assess a fixed cycle cost up front, because at the moment, switchTSS() doesn't assess anything.
     */
    this.nStepCycles -= this.CYCLES.nOpCyclesIRet;
    if (this.regCR0 & X86.CR0.MSW.PE) {
        if (this.regPS & X86.PS.NT) {
            var addrNew = this.segTSS.base;
            var sel = this.getShort(addrNew + X86.TSS.PREV_TSS);
            X86Seg.switchTSS.call(this.segCS, sel, false);
            return;
        }
    }
    var cpl = this.segCS.cpl;
    var regEIP = this.popWord();
    var regCS  = this.popWord();
    var regPS  = this.popWord();
    if (this.setCSIP(regEIP, regCS, false) != null) {
        this.setPS(regPS, cpl);
        if (this.cIntReturn) this.checkIntReturn(this.regLIP);
    }
};

/**
 * fnJMPw(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnJMPw = function JMPw(dst, src)
{
    this.setIP(dst);
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesJmpWR : this.CYCLES.nOpCyclesJmpWM);
    this.opFlags |= X86.OPFLAG.NOWRITE;
    return dst;
};

/**
 * fnJMPFdw(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnJMPFdw = function JMPFdw(dst, src)
{
    if (this.regEA === X86.ADDR_INVALID) {
        return X86.fnGRPUndefined.call(this, dst, src);
    }
    this.setCSIP(dst, this.getShort(this.regEA + 2));
    if (this.cIntReturn) this.checkIntReturn(this.regLIP);
    this.nStepCycles -= this.CYCLES.nOpCyclesJmpDM;
    this.opFlags |= X86.OPFLAG.NOWRITE;
    return dst;
};

/**
 * fnLAR(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnLAR = function LAR(dst, src)
{
    this.nStepCycles -= (14 + (this.regEA === X86.ADDR_INVALID? 0 : 2));
    /*
     * Currently, segVER.load() will return an error only if the selector is beyond the bounds of the
     * descriptor table or the descriptor is not for a segment.
     *
     * TODO: This instruction's 80286 documentation does not discuss conforming code segments; determine
     * if we need a special check for them.
     */
    if (this.segVER.load(src, true) != X86.ADDR_INVALID) {
        if (this.segVER.dpl >= this.segCS.cpl && this.segVER.dpl >= (src & X86.SEL.RPL)) {
            this.setZF();
            return this.segVER.acc & X86.DESC.ACC.MASK;
        }
    }
    this.clearZF();
    return dst;
};

/**
 * fnLCR0(l)
 *
 * This called on behalf of 80386 opcodes only (ie, MOV CR0,reg).
 *
 * TODO: Determine which CR0 bits, if any, cannot be modified by MOV CR0,reg.
 *
 * @this {X86CPU}
 * @param {number} l
 */
X86.fnLCR0 = function LCR0(l)
{
    this.regCR0 = l;
    this.setProtMode(!!(this.regCR0 & X86.CR0.MSW.PE));
};

/**
 * fnLDS(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnLDS = function LDS(dst, src)
{
    if (this.regEA === X86.ADDR_INVALID) {
        X86.opUndefined.call(this);
        return dst;
    }
    this.setDS(this.getShort(this.regEA + 2));
    this.nStepCycles -= this.CYCLES.nOpCyclesLS;
    return src;
};

/**
 * fnLEA(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnLEA = function LEA(dst, src)
{
    if (this.regEA === X86.ADDR_INVALID) {
        /*
         * TODO: After reading http://www.os2museum.com/wp/undocumented-8086-opcodes/, it seems that this
         * form of LEA (eg, "LEA AX,DX") simply returns the last calculated EA.  Since we always reset regEA
         * at the start of a new instruction, we would need to preserve the previous EA if we want to mimic
         * that (undocumented) behavior.
         *
         * And for completeness, we would have to extend EA tracking beyond the usual ModRM instructions
         * (eg, XLAT, instructions that modify the stack pointer, and string instructions).  Anything else?
         */
        X86.opUndefined.call(this);
        return dst;
    }
    this.nStepCycles -= this.CYCLES.nOpCyclesLEA;
    return this.regEA;
};

/**
 * fnLES(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnLES = function LES(dst, src)
{
    if (this.regEA === X86.ADDR_INVALID) {
        X86.opUndefined.call(this);
        return dst;
    }
    this.setES(this.getShort(this.regEA + 2));
    this.nStepCycles -= this.CYCLES.nOpCyclesLS;
    return src;
};

/**
 * fnLGDT(dst, src)
 *
 * op=0x0F,0x01,reg=0x2 (GRP7:LGDT)
 *
 * The 80286 LGDT instruction expects a 40-bit operand: a 16-bit limit, followed by a 24-bit address;
 * the ModRM decoder has already supplied the first word of the operand (in dst), which corresponds to the
 * limit, so we must fetch the remaining 24 bits ourselves.
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnLGDT = function LGDT(dst, src)
{
    if (this.regEA === X86.ADDR_INVALID) {
        X86.opInvalid.call(this);
    } else {
        this.addrGDT = this.getShort(this.regEA + 2) | (this.getByte(this.regEA + 4) << 16);
        this.addrGDTLimit = this.addrGDT + dst;
        this.opFlags |= X86.OPFLAG.NOWRITE;
        this.nStepCycles -= 11;
    }
    return dst;
};

/**
 * fnLIDT(dst, src)
 *
 * op=0x0F,0x01,reg=0x3 (GRP7:LIDT)
 *
 * The 80286 LIDT instruction expects a 40-bit operand: a 16-bit limit, followed by a 24-bit address;
 * the ModRM decoder has already supplied the first word of the operand (in dst), which corresponds to the
 * limit, so we must fetch the remaining 24 bits ourselves.
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnLIDT = function LIDT(dst, src)
{
    if (this.regEA === X86.ADDR_INVALID) {
        X86.opInvalid.call(this);
    } else {
        this.addrIDT = this.getShort(this.regEA + 2) | (this.getByte(this.regEA + 4) << 16);
        this.addrIDTLimit = this.addrIDT + dst;
        this.opFlags |= X86.OPFLAG.NOWRITE;
        this.nStepCycles -= 12;
    }
    return dst;
};

/**
 * fnLLDT(dst, src)
 *
 * op=0x0F,0x00,reg=0x2 (GRP6:LLDT)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnLLDT = function LLDT(dst, src) {
    this.opFlags |= X86.OPFLAG.NOWRITE;
    this.segLDT.load(dst);
    this.nStepCycles -= (17 + (this.regEA === X86.ADDR_INVALID? 0 : 2));
    return dst;
};

/**
 * fnLMSW(dst, src)
 *
 * op=0x0F,0x01,reg=0x6 (GRP7:LMSW)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnLMSW = function LMSW(dst, src)
{
    this.setMSW(dst);
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? 3 : 6);
    this.opFlags |= X86.OPFLAG.NOWRITE;
    return dst;
};

/**
 * fnLSL(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (the selector)
 * @return {number}
 */
X86.fnLSL = function LSL(dst, src)
{
    /*
     * TODO: Is this an invalid operation if regEAWrite is set?  dst is required to be a register.
     */
    this.nStepCycles -= (14 + (this.regEA === X86.ADDR_INVALID? 0 : 2));
    /*
     * Currently, segVER.load() will return an error only if the selector is beyond the bounds of the
     * descriptor table or the descriptor is not for a segment.
     *
     * TODO: LSL is explicitly documented as ALSO requiring a non-null selector, so we check X86.SEL.MASK;
     * are there any other instructions that were, um, less explicit but also require a non-null selector?
     */
    if ((src & X86.SEL.MASK) && this.segVER.load(src, true) != X86.ADDR_INVALID) {
        var fConforming = ((this.segVER.acc & X86.DESC.ACC.TYPE.CODE_CONFORMING) == X86.DESC.ACC.TYPE.CODE_CONFORMING);
        if ((fConforming || this.segVER.dpl >= this.segCS.cpl) && this.segVER.dpl >= (src & X86.SEL.RPL)) {
            this.setZF();
            return this.segVER.limit;
        }
    }
    this.clearZF();
    return dst;
};

/**
 * fnLTR(dst, src)
 *
 * op=0x0F,0x00,reg=0x3 (GRP6:LTR)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnLTR = function LTR(dst, src)
{
    this.opFlags |= X86.OPFLAG.NOWRITE;
    if (this.segTSS.load(dst) != X86.ADDR_INVALID) {
        this.setShort(this.segTSS.addrDesc + X86.DESC.ACC.OFFSET, this.segTSS.acc |= X86.DESC.ACC.TYPE.LDT);
        this.segTSS.type = X86.DESC.ACC.TYPE.TSS_BUSY;
    }
    this.nStepCycles -= (17 + (this.regEA === X86.ADDR_INVALID? 0 : 2));
    return dst;
};

/**
 * fnMOV(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst (current value, ignored)
 * @param {number} src (new value)
 * @return {number} dst (updated value, from src)
 */
X86.fnMOV = function MOV(dst, src)
{
    this.nStepCycles -= (this.regEAWrite === X86.ADDR_INVALID? (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesMovRR : this.CYCLES.nOpCyclesMovRM) : this.CYCLES.nOpCyclesMovMR);
    return src;
};

/**
 * fnMOVimm(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst (current value, ignored)
 * @param {number} src (new value)
 * @return {number} dst (updated value, from src)
 */
X86.fnMOVImm = function MOVImm(dst, src)
{
    this.nStepCycles -= (this.regEAWrite === X86.ADDR_INVALID? this.CYCLES.nOpCyclesMovRI : this.CYCLES.nOpCyclesMovMI);
    return src;
};

/**
 * fnMOVMD16(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst (current value, ignored)
 * @param {number} src (new value)
 * @return {number} dst (src is overridden, replaced with regMD16, as specified by opMOVwsr())
 */
X86.fnMOVMD16 = function MOVMD16(dst, src)
{
    return X86.fnMOV.call(this, dst, this.regMD16);
};

/**
 * fnMULb(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number} (we return dst unchanged, since it's actually AX that's modified)
 */
X86.fnMULb = function MULb(dst, src)
{
    this.regEAX = this.regMD16 = ((src = this.regEAX & 0xff) * dst) & 0xffff;
    if (this.regEAX & 0xff00) {
        this.setCF(); this.setOF();
    } else {
        this.clearCF(); this.clearOF();
    }
    /*
     * Multiply/divide instructions specify only a single operand, which the decoders pass to us
     * via the dst parameter, so we set src to the other implied operand (either AX or DX:AX).
     * However, src is technically an output, and dst is merely an input (which is why we must return
     * dst unchanged). So, to make traceLog() more consistent, we reverse the order of dst and src.
     */
    if (DEBUG && DEBUGGER) this.traceLog('MULB', src, dst, null, this.getPS(), this.regMD16);
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesMulBR : this.CYCLES.nOpCyclesMulBM);
    this.opFlags |= X86.OPFLAG.NOWRITE;
    return dst;
};

/**
 * fnMULw(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number} (we return dst unchanged, since it's actually DX:AX that's modified)
 */
X86.fnMULw = function MULw(dst, src)
{
    var result = (src = this.regEAX) * dst;
    this.regMD16 = this.regEAX = result & 0xffff;
    this.regMD32 = this.regEDX = (result >> 16) & 0xffff;
    if (this.regEDX) {
        this.setCF(); this.setOF();
    } else {
        this.clearCF(); this.clearOF();
    }
    /*
     * Multiply/divide instructions specify only a single operand, which the decoders pass to us
     * via the dst parameter, so we set src to the other implied operand (either AX or DX:AX).
     * However, src is technically an output, and dst is merely an input (which is why we must return
     * dst unchanged). So, to make traceLog() more consistent, we reverse the order of dst and src.
     */
    if (DEBUG && DEBUGGER) this.traceLog('MULW', src, dst, null, this.getPS(), this.regMD16 | (this.regMD32 << 16));
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesMulWR : this.CYCLES.nOpCyclesMulWM);
    this.opFlags |= X86.OPFLAG.NOWRITE;
    return dst;
};

/**
 * fnNEGb(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnNEGb = function NEGb(dst, src)
{
    var b = (-dst)|0;
    this.setArithResult(0, dst, b, X86.RESULT.BYTE | X86.RESULT.ALL, true);
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesNegR : this.CYCLES.nOpCyclesNegM);
    return b & 0xff;
};

/**
 * fnNEGw(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnNEGw = function NEGw(dst, src)
{
    var w = (-dst)|0;
    this.setArithResult(0, dst, w, X86.RESULT.WORD | X86.RESULT.ALL, true);
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesNegR : this.CYCLES.nOpCyclesNegM);
    return w & 0xffff;
};

/**
 * fnNOTb(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnNOTb = function NOTb(dst, src)
{
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesNegR : this.CYCLES.nOpCyclesNegM);
    return dst ^ 0xff;
};

/**
 * fnNOTw(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnNOTw = function NOTw(dst, src)
{
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesNegR : this.CYCLES.nOpCyclesNegM);
    return dst ^ 0xffff;
};

/**
 * fnORb(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnORb = function ORb(dst, src)
{
    var b = dst | src;
    this.setLogicResult(b, X86.RESULT.BYTE);
    this.nStepCycles -= (this.regEAWrite === X86.ADDR_INVALID? (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesArithRR : this.CYCLES.nOpCyclesArithRM) : this.CYCLES.nOpCyclesArithMR);
    return b;
};

/**
 * fnORw(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnORw = function ORw(dst, src)
{
    var w = dst | src;
    this.setLogicResult(w, X86.RESULT.WORD);
    this.nStepCycles -= (this.regEAWrite === X86.ADDR_INVALID? (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesArithRR : this.CYCLES.nOpCyclesArithRM) : this.CYCLES.nOpCyclesArithMR);
    return w;
};

/**
 * fnPOPw(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst (current value, ignored)
 * @param {number} src (new value)
 * @return {number} dst (updated value, from src)
 */
X86.fnPOPw = function POPw(dst, src)
{
    this.nStepCycles -= (this.regEAWrite === X86.ADDR_INVALID? this.CYCLES.nOpCyclesPopReg : this.CYCLES.nOpCyclesPopMem);
    return src;
};

/**
 * fnPUSHw(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnPUSHw = function PUSHw(dst, src)
{
    var w = dst;
    if (this.opFlags & X86.OPFLAG.PUSHSP) {
        /*
         * This is the one case where must actually modify dst, so that the ModRM function will
         * not put a stale value back into the SP register.
         */
        dst = (dst - 2) & 0xffff;
        /*
         * And on the 8086/8088, the value we just calculated also happens to be the value that must
         * be pushed.
         */
        if (this.model < X86.MODEL_80286) w = dst;
    }
    this.pushWord(w);
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesPushReg : this.CYCLES.nOpCyclesPushMem);
    /*
     * The PUSH is the only write that needs to occur; dst was the source operand and does not need to be rewritten.
     */
    this.opFlags |= X86.OPFLAG.NOWRITE;
    return dst;
};

/**
 * fnRCLb(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (1 or CL)
 * @return {number}
 */
X86.fnRCLb = function RCLb(dst, src)
{
    var result = dst;
    var flagsIn = (DEBUG? this.getPS() : 0);
    if (src) {
        var carry = this.getCarry();
        var shift = (src & this.nShiftCountMask) % 9;
        if (!shift) {
            carry <<= 7;
        } else {
            /*
             * shift is 1-8, which means the new carry will come from the dst bit
             * at position 7-0.  To force it into position 7, left shift by (shift - 1).
             */
            result = ((dst << shift) | (carry << (shift - 1)) | (dst >> (9 - shift))) & 0xff;
            carry = dst << (shift - 1);
        }
        X86.setRotateResult.call(this, result, carry, X86.RESULT.BYTE);
    }
    if (DEBUG && DEBUGGER) this.traceLog('RCLB', dst, src, flagsIn, this.getPS(), result);
    return result;
};

/**
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (1 or CL)
 * @return {number}
 */
X86.fnRCLw = function RCLw(dst, src)
{
    var result = dst;
    var flagsIn = (DEBUG? this.getPS() : 0);
    if (src) {
        var carry = this.getCarry();
        var shift = (src & this.nShiftCountMask) % 17;
        if (!shift) {
            carry <<= 15;
        } else {
            /*
             * shift is 1-16, which means the new carry will come from the dst bit
             * at position 15-0.  To force it into position 15, left shift by (shift - 1).
             */
            result = ((dst << shift) | (carry << (shift - 1)) | (dst >> (17 - shift))) & 0xffff;
            carry = dst << (shift - 1);
        }
        X86.setRotateResult.call(this, result, carry, X86.RESULT.WORD);
    }
    if (DEBUG && DEBUGGER) this.traceLog('RCLW', dst, src, flagsIn, this.getPS(), result);
    return result;
};

/**
 * fnRCRb(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (1 or CL)
 * @return {number}
 */
X86.fnRCRb = function RCRb(dst, src)
{
    var result = dst;
    var flagsIn = (DEBUG? this.getPS() : 0);
    if (src) {
        var carry = this.getCarry();
        var shift = (src & this.nShiftCountMask) % 9;
        if (!shift) {
            carry <<= 7;
        } else {
            /*
             * shift is 1-8, which means the new carry will come from the dst bit
             * at position 0-7.  To force it into position 7, left shift by (8 - shift).
             */
            result = ((dst >> shift) | (carry << (8 - shift)) | (dst << (9 - shift))) & 0xff;
            carry = dst << (8 - shift);
        }
        X86.setRotateResult.call(this, result, carry, X86.RESULT.BYTE);
    }
    if (DEBUG && DEBUGGER) this.traceLog('RCRB', dst, src, flagsIn, this.getPS(), result);
    return result;
};

/**
 * fnRCRw(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (1 or CL)
 * @return {number}
 */
X86.fnRCRw = function RCRw(dst, src)
{
    var result = dst;
    var flagsIn = (DEBUG? this.getPS() : 0);
    if (src) {
        var carry = this.getCarry();
        var shift = (src & this.nShiftCountMask) % 17;
        if (!shift) {
            carry <<= 15;
        } else {
            /*
             * shift is 1-16, which means the new carry will come from the dst bit
             * at position 0-15.  To force it into position 15, left shift by (16 - shift).
             */
            result = ((dst >> shift) | (carry << (16 - shift)) | (dst << (17 - shift))) & 0xffff;
            carry = dst << (16 - shift);
        }
        X86.setRotateResult.call(this, result, carry, X86.RESULT.WORD);
    }
    if (DEBUG && DEBUGGER) this.traceLog('RCRW', dst, src, flagsIn, this.getPS(), result);
    return result;
};

/**
 * fnRETF(n)
 *
 * For protected-mode, this function must be prepared to pop any arguments off the current stack AND
 * whatever stack we may have switched to (setCSIP() returns true only when a stack switch has occurred).
 *
 * @this {X86CPU}
 * @param {number} n
 */
X86.fnRETF = function RETF(n)
{
    var regEIP = this.popWord();
    var regCS = this.popWord();
    n <<= (this.dataSize >> 2);
    if (n) this.setSP(this.getSP() + n);            // TODO: optimize
    if (this.setCSIP(regEIP, regCS, false)) {
        if (n) this.setSP(this.getSP() + n);        // TODO: optimize
        /*
         * As per Intel documentation: "If any of [the DS or ES] registers refer to segments whose DPL is
         * less than the new CPL (excluding conforming code segments), the segment register is loaded with
         * the null selector."
         *
         * TODO: I'm not clear on whether a conforming code segment must also be marked readable, so I'm playing
         * it safe and using CODE_CONFORMING instead of CODE_CONFORMING_READABLE.  Also, for the record, I've not
         * seen this situation occur in OS/2 1.0 yet.
         */
        if ((this.segDS.sel & X86.SEL.MASK) && this.segDS.dpl < this.segCS.cpl && (this.segDS.acc & X86.DESC.ACC.TYPE.CODE_CONFORMING) != X86.DESC.ACC.TYPE.CODE_CONFORMING) {
            this.assert(false);         // I'm not asserting this is bad, I just want to see it in action
            this.segDS.load(0);
        }
        if ((this.segES.sel & X86.SEL.MASK) && this.segES.dpl < this.segCS.cpl && (this.segES.acc & X86.DESC.ACC.TYPE.CODE_CONFORMING) != X86.DESC.ACC.TYPE.CODE_CONFORMING) {
            this.assert(false);         // I'm not asserting this is bad, I just want to see it in action
            this.segES.load(0);
        }
    }
    if (n == 2 && this.cIntReturn) this.checkIntReturn(this.regLIP);
};

/**
 * fnROLb(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (1 or CL)
 * @return {number}
 */
X86.fnROLb = function ROLb(dst, src)
{
    var result = dst;
    var flagsIn = (DEBUG? this.getPS() : 0);
    if (src) {
        var carry;
        /*
         * The following mask obviates the need to use nShiftCountMask.
         */
        var shift = src & 0x7;
        if (!shift) {
            /*
             * shift is 8, which means the new carry will come from the dst bit
             * at position 0.
             */
            carry = dst << 7;
        } else {
            /*
             * shift is 1-7, which means the new carry will come from the dst bit
             * at position 7-1.  To force it into position 7, left shift by (shift - 1).
             */
            result = ((dst << shift) | (dst >> (8 - shift))) & 0xff;
            carry = dst << (shift - 1);
        }
        X86.setRotateResult.call(this, result, carry, X86.RESULT.BYTE);
    }
    if (DEBUG && DEBUGGER) this.traceLog('ROLB', dst, src, flagsIn, this.getPS(), result);
    return result;
};

/**
 * fnROLw(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (1 or CL)
 * @return {number}
 */
X86.fnROLw = function ROLw(dst, src)
{
    var result = dst;
    var flagsIn = (DEBUG? this.getPS() : 0);
    if (src) {
        var carry;
        /*
         * The following mask obviates the need to use nShiftCountMask.
         */
        var shift = src & 0xf;
        if (!shift) {
            carry = dst << 15;
        } else {
            /*
             * shift is 1-15, which means the new carry will come from the dst bit
             * at position 15-1.  To force it into position 15, left shift by (shift - 1).
             */
            result = ((dst << shift) | (dst >> (16 - shift))) & 0xffff;
            carry = dst << (shift - 1);
        }
        X86.setRotateResult.call(this, result, carry, X86.RESULT.WORD);
    }
    if (DEBUG && DEBUGGER) this.traceLog('ROLW', dst, src, flagsIn, this.getPS(), result);
    return result;
};

/**
 * fnRORb(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (1 or CL)
 * @return {number}
 */
X86.fnRORb = function RORb(dst, src)
{
    var result = dst;
    var flagsIn = (DEBUG? this.getPS() : 0);
    if (src) {
        var carry;
        /*
         * The following mask obviates the need to use nShiftCountMask.
         */
        var shift = src & 0x7;
        if (!shift) {
            /*
             * shift is 8, which means the new carry will come from the dst bit at position 7.
             */
            carry = dst;
        } else {
            /*
             * shift is 1-7, which means the new carry will come from the dst bit
             * at position 0-6.  To force it into position 7, left shift by (8 - shift).
             */
            result = ((dst >> shift) | (dst << (8 - shift))) & 0xff;
            carry = dst << (8 - shift);
        }
        X86.setRotateResult.call(this, result, carry, X86.RESULT.BYTE);
    }
    if (DEBUG && DEBUGGER) this.traceLog('RORB', dst, src, flagsIn, this.getPS(), result);
    return result;
};

/**
 * fnRORw(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (1 or CL)
 * @return {number}
 */
X86.fnRORw = function RORw(dst, src)
{
    var result = dst;
    var flagsIn = (DEBUG? this.getPS() : 0);
    if (src) {
        var carry;
        /*
         * The following mask obviates the need to use nShiftCountMask.
         */
        var shift = src & 0xf;
        if (!shift) {
            /*
             * shift is 16, which means the new carry will come from dst bit 15.
             */
            carry = dst;
        } else {
            /*
             * shift is 1-15, which means the new carry will come from the dst bit
             * at position 0-14.  To force it into position 15, left shift by (16 - shift).
             */
            result = ((dst >> shift) | (dst << (16 - shift))) & 0xffff;
            carry = dst << (16 - shift);
        }
        X86.setRotateResult.call(this, result, carry, X86.RESULT.WORD);
    }
    if (DEBUG && DEBUGGER) this.traceLog('RORW', dst, src, flagsIn, this.getPS(), result);
    return result;
};

/**
 * fnSARb(dst, src)
 *
 * NOTE: Although we set all the arithmetic flags for shift instructions, AF isn't actually
 * defined on a real 8086/8088.  Similarly, OF is undefined for shifts > 1.  See fnSHLb() for
 * more details.
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (1 or CL, or an immediate byte for 80186/80188 and up)
 * @return {number}
 */
X86.fnSARb = function SARb(dst, src)
{
    if (src) {
        /*
         * The following comparison obviates the need to mask src with nShiftCountMask.
         */
        if (src > 8) src = 9;
        var temp = ((dst << 24) >> 24) >> (src - 1);
        dst = (temp >> 1) & 0xff;
        this.setLogicResult(dst, X86.RESULT.BYTE, temp & 0x1);
    }
    return dst;
};

/**
 * fnSARw(dst, src)
 *
 * NOTE: Although we set all the arithmetic flags for shift instructions, AF isn't actually
 * defined on a real 8086/8088.  Similarly, OF is undefined for shifts > 1.  See fnSHLb() for
 * more details.
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (1 or CL, or an immediate byte for 80186/80188 and up)
 * @return {number}
 */
X86.fnSARw = function SARw(dst, src)
{
    if (src) {
        /*
         * The following comparison obviates the need to mask src with nShiftCountMask.
         */
        if (src > 16) src = 17;
        var temp = ((dst << 16) >> 16) >> (src - 1);
        dst = (temp >> 1) & 0xffff;
        this.setLogicResult(dst, X86.RESULT.WORD, temp & 0x1);
    }
    return dst;
};

/**
 * fnSBBb(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnSBBb = function SBBb(dst, src)
{
    var b = (dst - src - this.getCarry())|0;
    this.setArithResult(dst, src, b, X86.RESULT.BYTE | X86.RESULT.ALL, true);
    this.nStepCycles -= (this.regEAWrite === X86.ADDR_INVALID? (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesArithRR : this.CYCLES.nOpCyclesArithRM) : this.CYCLES.nOpCyclesArithMR);
    return b & 0xff;
};

/**
 * fnSBBw(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnSBBw = function SBBw(dst, src)
{
    var w = (dst - src - this.getCarry())|0;
    this.setArithResult(dst, src, w, X86.RESULT.WORD | X86.RESULT.ALL, true);
    this.nStepCycles -= (this.regEAWrite === X86.ADDR_INVALID? (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesArithRR : this.CYCLES.nOpCyclesArithRM) : this.CYCLES.nOpCyclesArithMR);
    return w & 0xffff;
};

/**
 * fnSGDT(dst, src)
 *
 * op=0x0F,0x01,reg=0x0 (GRP7:SGDT)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnSGDT = function SGDT(dst, src)
{
    if (this.regEA === X86.ADDR_INVALID) {
        X86.opInvalid.call(this);
    } else {
        /*
         * We don't need to setShort() the first word of the operand, because the ModRM group decoder that
         * calls us does that automatically with the value we return (dst).
         */
        dst = this.addrGDTLimit - this.addrGDT;
        this.setShort(this.regEA + 2, this.addrGDT);
        /*
         * We previously left the 6th byte of the target operand "undefined".  But it turns out we have to set
         * it to *something*, because there's processor detection in PC-DOS 7.0 (at least in the SETUP portion)
         * that looks like this:
         *
         *      145E:4B84 9C            PUSHF
         *      145E:4B85 55            PUSH     BP
         *      145E:4B86 8BEC          MOV      BP,SP
         *      145E:4B88 B80000        MOV      AX,0000
         *      145E:4B8B 50            PUSH     AX
         *      145E:4B8C 9D            POPF
         *      145E:4B8D 9C            PUSHF
         *      145E:4B8E 58            POP      AX
         *      145E:4B8F 2500F0        AND      AX,F000
         *      145E:4B92 3D00F0        CMP      AX,F000
         *      145E:4B95 7511          JNZ      4BA8
         *      145E:4BA8 C8060000      ENTER    0006,00
         *      145E:4BAC 0F0146FA      SGDT     [BP-06]
         *      145E:4BB0 807EFFFF      CMP      [BP-01],FF
         *      145E:4BB4 C9            LEAVE
         *      145E:4BB5 BA8603        MOV      DX,0386
         *      145E:4BB8 7503          JNZ      4BBD
         *      145E:4BBA BA8602        MOV      DX,0286
         *      145E:4BBD 89163004      MOV      [0430],DX
         *      145E:4BC1 5D            POP      BP
         *      145E:4BC2 9D            POPF
         *      145E:4BC3 CB            RETF
         *
         * This code is expecting SGDT on an 80286 to set the 6th "undefined" byte to 0xFF.  So we use setShort()
         * instead of setByte() and force the upper byte to 0xFF.
         *
         * TODO: Remove the 0xFF00 below on post-80286 processors; also, determine whether this behavior is unique to real-mode.
         */
        this.setShort(this.regEA + 4, 0xFF00 | (this.addrGDT >> 16));
        this.nStepCycles -= 11;
    }
    return dst;
};

/**
 * fnSHLb(dst, src)
 *
 * NOTE: Although we set all the arithmetic flags for shift instructions, AF isn't actually
 * defined on a real 8086/8088.  Similarly, OF is undefined for shifts > 1.
 *
 * For example, when AL=09, "SHL AL,1" may clear AF on a real CPU, whereas we will set it.
 * However, until I find or produce documented 8086/8088 behaviors for AF and OF, and/or code
 * that depends on them, I'll continue setting AF and OF "normally".
 *
 * See also: AND, OR, TEST, and XOR (those instructions leave AF undefined as well).
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (1 or CL, or an immediate byte for 80186/80188 and up)
 * @return {number}
 */
X86.fnSHLb = function SHLb(dst, src)
{
    var result = dst;
    var flagsIn = (DEBUG? this.getPS() : 0);
    if (src) {
        var carry = 0;
        /*
         * The following comparison obviates the need to mask src with nShiftCountMask.
         */
        if (src > 8) {
            result = 0;
        } else {
            carry = dst << (src - 1);
            result = (carry << 1) & 0xff;
        }
        this.setLogicResult(result, X86.RESULT.BYTE, carry & X86.RESULT.BYTE, (result ^ carry) & X86.RESULT.BYTE);
    }
    if (DEBUG && DEBUGGER) this.traceLog('SHLB', dst, src, flagsIn, this.getPS(), result);
    return result;
};

/**
 * fnSHLw(dst, src)
 *
 * NOTE: Although we set all the arithmetic flags for shift instructions, AF isn't actually
 * defined on a real 8086/8088.  Similarly, OF is undefined for shifts > 1.  See fnSHLb() for
 * more details.
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (1 or CL, or an immediate byte for 80186/80188 and up)
 * @return {number}
 */
X86.fnSHLw = function SHLw(dst, src)
{
    var result = dst;
    var flagsIn = (DEBUG? this.getPS() : 0);
    if (src) {
        var carry = 0;
        /*
         * The following comparison obviates the need to mask src with nShiftCountMask.
         */
        if (src > 16) {
            result = 0;
        } else {
            carry = dst << (src - 1);
            result = (carry << 1) & 0xffff;
        }
        this.setLogicResult(result, X86.RESULT.WORD, carry & X86.RESULT.WORD, (result ^ carry) & X86.RESULT.WORD);
    }
    if (DEBUG && DEBUGGER) this.traceLog('SHLW', dst, src, flagsIn, this.getPS(), result);
    return result;
};

/**
 * fnSHRb(dst, src)
 *
 * NOTE: Although we set all the arithmetic flags for shift instructions, AF isn't actually
 * defined on a real 8086/8088.  Similarly, OF is undefined for shifts > 1.  See fnSHLb() for
 * more details.
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (1 or CL, or an immediate byte for 80186/80188 and up)
 * @return {number}
 */
X86.fnSHRb = function SHRb(dst, src)
{
    if (src) {
        /*
         * The following comparison obviates the need to mask src with nShiftCountMask.
         */
        var temp = (src > 8? 0 : (dst >> (src - 1)));
        dst = (temp >> 1) & 0xff;
        this.setLogicResult(dst, X86.RESULT.BYTE, temp & 0x1, dst & X86.RESULT.BYTE);
    }
    return dst;
};

/**
 * fnSHRw(dst, src)
 *
 * NOTE: Although we set all the arithmetic flags for shift instructions, AF isn't actually
 * defined on a real 8086/8088.  Similarly, OF is undefined for shifts > 1.  See fnSHLb() for
 * more details.
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (1 or CL, or an immediate byte for 80186/80188 and up)
 * @return {number}
 */
X86.fnSHRw = function SHRw(dst, src)
{
    if (src) {
        /*
         * The following comparison obviates the need to mask src with nShiftCountMask.
         */
        var temp = (src > 16? 0 : (dst >> (src - 1)));
        dst = (temp >> 1) & 0xffff;
        this.setLogicResult(dst, X86.RESULT.WORD, temp & 0x1, dst & X86.RESULT.WORD);
    }
    return dst;
};

/**
 * fnSIDT(dst, src)
 *
 * op=0x0F,0x01,reg=0x1 (GRP7:SIDT)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnSIDT = function SIDT(dst, src)
{
    if (this.regEA === X86.ADDR_INVALID) {
        X86.opInvalid.call(this);
    } else {
        /*
         * We don't need to setShort() the first word of the operand, because the ModRM group decoder that calls
         * us does that automatically with the value we return (dst).
         */
        dst = this.addrIDTLimit - this.addrIDT;
        this.setShort(this.regEA + 2, this.addrIDT);
        /*
         * As with SGDT, the 6th byte is technically "undefined" on an 80286, but we now set it to 0xFF, for the
         * same reasons discussed in SGDT (above).
         *
         * TODO: Remove the 0xFF00 below on post-80286 processors; also, determine whether this behavior is unique to real-mode.
         */
        this.setShort(this.regEA + 4, 0xFF00 | (this.addrIDT >> 16));
        this.nStepCycles -= 12;
    }
    return dst;
};

/**
 * fnSLDT(dst, src)
 *
 * op=0x0F,0x00,reg=0x0 (GRP6:SLDT)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnSLDT = function SLDT(dst, src)
{
    this.nStepCycles -= (2 + (this.regEA === X86.ADDR_INVALID? 0 : 1));
    return this.segLDT.sel;
};

/**
 * fnSMSW(dst, src)
 *
 * op=0x0F,0x01,reg=0x4 (GRP7:SMSW)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnSMSW = function SMSW(dst, src)
{
    this.nStepCycles -= (2 + (this.regEA === X86.ADDR_INVALID? 0 : 1));
    return this.regCR0;
};

/**
 * fnSTR(dst, src)
 *
 * op=0x0F,0x00,reg=0x1 (GRP6:STR)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnSTR = function STR(dst, src)
{
    this.nStepCycles -= (2 + (this.regEA === X86.ADDR_INVALID? 0 : 1));
    return this.segTSS.sel;
};

/**
 * fnSUBb(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnSUBb = function SUBb(dst, src)
{
    var b = (dst - src)|0;
    this.setArithResult(dst, src, b, X86.RESULT.BYTE | X86.RESULT.ALL, true);
    this.nStepCycles -= (this.regEAWrite === X86.ADDR_INVALID? (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesArithRR : this.CYCLES.nOpCyclesArithRM) : this.CYCLES.nOpCyclesArithMR);
    return b & 0xff;
};

/**
 * fnSUBw(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnSUBw = function SUBw(dst, src)
{
    var w = (dst - src)|0;
    this.setArithResult(dst, src, w, X86.RESULT.WORD | X86.RESULT.ALL, true);
    this.nStepCycles -= (this.regEAWrite === X86.ADDR_INVALID? (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesArithRR : this.CYCLES.nOpCyclesArithRM) : this.CYCLES.nOpCyclesArithMR);
    return w & 0xffff;
};

/**
 * fnTEST8(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null; we have to supply the source ourselves)
 * @return {number}
 */
X86.fnTEST8 = function TEST8(dst, src)
{
    src = this.getIPByte();
    this.setLogicResult(dst & src, X86.RESULT.BYTE);
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesTestRI : this.CYCLES.nOpCyclesTestMI);
    this.opFlags |= X86.OPFLAG.NOWRITE;
    return dst;
};

/**
 * fnTEST16(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null; we have to supply the source ourselves)
 * @return {number}
 */
X86.fnTEST16 = function TEST16(dst, src)
{
    src = this.getIPWord();
    this.setLogicResult(dst & src, X86.RESULT.WORD);
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesTestRI : this.CYCLES.nOpCyclesTestMI);
    this.opFlags |= X86.OPFLAG.NOWRITE;
    return dst;
};

/**
 * fnTESTb(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnTESTb = function TESTb(dst, src)
{
    this.setLogicResult(dst & src, X86.RESULT.BYTE);
    this.nStepCycles -= (this.regEAWrite === X86.ADDR_INVALID? (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesTestRR : this.CYCLES.nOpCyclesTestRM) : this.CYCLES.nOpCyclesTestRM);
    this.opFlags |= X86.OPFLAG.NOWRITE;
    return dst;
};

/**
 * fnTESTw(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnTESTw = function TESTw(dst, src)
{
    this.setLogicResult(dst & src, X86.RESULT.WORD);
    this.nStepCycles -= (this.regEAWrite === X86.ADDR_INVALID? (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesTestRR : this.CYCLES.nOpCyclesTestRM) : this.CYCLES.nOpCyclesTestRM);
    this.opFlags |= X86.OPFLAG.NOWRITE;
    return dst;
};

/**
 * fnVERR(dst, src)
 *
 * op=0x0F,0x00,reg=0x4 (GRP6:VERR)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnVERR = function VERR(dst, src)
{
    this.opFlags |= X86.OPFLAG.NOWRITE;
    /*
     * Currently, segVER.load() will return an error only if the selector is beyond the bounds of the
     * descriptor table or the descriptor is not for a segment.
     */
    this.nStepCycles -= (14 + (this.regEA === X86.ADDR_INVALID? 0 : 2));
    if (this.segVER.load(dst, true) != X86.ADDR_INVALID) {
        /*
         * Verify that this is a readable segment; that is, of these four combinations (code+readable,
         * code+nonreadable, data+writable, date+nonwritable), make sure we're not the second combination.
         */
        if ((this.segVER.acc & (X86.DESC.ACC.TYPE.READABLE | X86.DESC.ACC.TYPE.CODE)) != X86.DESC.ACC.TYPE.CODE) {
            /*
             * For VERR, if the code segment is readable and conforming, the descriptor privilege level
             * (DPL) can be any value.
             *
             * Otherwise, DPL must be greater than or equal to (have less or the same privilege as) both the
             * current privilege level and the selector's RPL.
             */
            if (this.segVER.dpl >= this.segCS.cpl && this.segVER.dpl >= (dst & X86.SEL.RPL) ||
                (this.segVER.acc & X86.DESC.ACC.TYPE.CODE_CONFORMING) == X86.DESC.ACC.TYPE.CODE_CONFORMING) {
                this.setZF();
                return dst;
            }
        }
    }
    this.clearZF();
    return dst;
};

/**
 * fnVERW(dst, src)
 *
 * op=0x0F,0x00,reg=0x5 (GRP6:VERW)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src (null)
 * @return {number}
 */
X86.fnVERW = function VERW(dst, src)
{
    this.opFlags |= X86.OPFLAG.NOWRITE;
    /*
     * Currently, segVER.load() will return an error only if the selector is beyond the bounds of the
     * descriptor table or the descriptor is not for a segment.
     */
    this.nStepCycles -= (14 + (this.regEA === X86.ADDR_INVALID? 0 : 2));
    if (this.segVER.load(dst, true) != X86.ADDR_INVALID) {
        /*
         * Verify that this is a writable data segment
         */
        if ((this.segVER.acc & (X86.DESC.ACC.TYPE.WRITABLE | X86.DESC.ACC.TYPE.CODE)) == X86.DESC.ACC.TYPE.WRITABLE) {
            /*
             * DPL must be greater than or equal to (have less or the same privilege as) both the current
             * privilege level and the selector's RPL.
             */
            if (this.segVER.dpl >= this.segCS.cpl && this.segVER.dpl >= (dst & X86.SEL.RPL)) {
                this.setZF();
                return dst;
            }
        }
    }
    this.clearZF();
    return dst;
};

/**
 * fnXCHGrb(dst, src)
 *
 * If an instruction like "XCHG AL,AH" was a traditional "op dst,src" instruction, dst would contain AL,
 * src would contain AH, and we would return src, which the caller would then store in AL, and we'd be done.
 *
 * However, that's only half of what XCHG does, so THIS function must perform the other half; in the previous
 * example, that entails storing AL (dst) into AH (src).
 *
 * BACKTRACK support is incomplete without also passing bti values as parameters, because the caller will
 * store btiAH in btiAL, but the original btiAL will be lost.  Similarly, if src is a memory operand, the
 * caller will store btiEALo in btiAL, but again, the original btiAL will be lost.
 *
 * BACKTRACK support for memory operands could be fixed by decoding the dst register in order to determine the
 * corresponding bti and then temporarily storing it in btiEALo around the setEAByte() call below.  Register-only
 * XCHGs would require a more extensive hack.  For now, I'm going to live with one-way BACKTRACK support here.
 *
 * TODO: Implement full BACKTRACK support for XCHG instructions.
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnXCHGrb = function XCHGRb(dst, src)
{
    if (this.regEA === X86.ADDR_INVALID) {
        /*
         * Decode which register was src
         */
        switch (this.bModRM & 0x7) {
        case 0x0:       // AL
            this.regEAX = (this.regEAX & ~0xff) | dst;
            break;
        case 0x1:       // CL
            this.regECX = (this.regECX & ~0xff) | dst;
            break;
        case 0x2:       // DL
            this.regEDX = (this.regEDX & ~0xff) | dst;
            break;
        case 0x3:       // BL
            this.regEBX = (this.regEBX & ~0xff) | dst;
            break;
        case 0x4:       // AH
            this.regEAX = (this.regEAX & 0xff) | (dst << 8);
            break;
        case 0x5:       // CH
            this.regECX = (this.regECX & 0xff) | (dst << 8);
            break;
        case 0x6:       // DH
            this.regEDX = (this.regEDX & 0xff) | (dst << 8);
            break;
        case 0x7:       // BH
            this.regEBX = (this.regEBX & 0xff) | (dst << 8);
            break;
        default:
            break;      // there IS no other case, but JavaScript inspections don't know that
        }
        this.nStepCycles -= this.CYCLES.nOpCyclesXchgRR;
    } else {
        /*
         * This is a case where the ModRM decoder that's calling us didn't know it should have called modEAByte()
         * instead of getEAByte(), so we compensate by updating regEAWrite.  However, setEAByte() has since been
         * changed to revalidate the write using segEA:offEA, so updating regEAWrite here isn't strictly necessary.
         */
        this.regEAWrite = this.regEA;
        this.setEAByte(dst);
        this.nStepCycles -= this.CYCLES.nOpCyclesXchgRM;
    }
    return src;
};

/**
 * fnXCHGrw(dst, src)
 *
 * If an instruction like "XCHG AX,DX" was a traditional "op dst,src" instruction, dst would contain AX,
 * src would contain DX, and we would return src, which the caller would then store in AX, and we'd be done.
 *
 * However, that's only half of what XCHG does, so THIS function must perform the other half; in the previous
 * example, that entails storing AX (dst) into DX (src).
 *
 * TODO: Implement full BACKTRACK support for XCHG instructions (see fnXCHGrb comments).
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnXCHGrw = function XCHGRw(dst, src)
{
    if (this.regEA === X86.ADDR_INVALID) {
        /*
         * Decode which register was src
         */
        switch (this.bModRM & 0x7) {
        case 0x0:       // AX
            this.regEAX = dst;
            break;
        case 0x1:       // CX
            this.regECX = dst;
            break;
        case 0x2:       // DX
            this.regEDX = dst;
            break;
        case 0x3:       // BX
            this.regEBX = dst;
            break;
        case 0x4:       // SP
            this.setSP(dst);
            break;
        case 0x5:       // BP
            this.regEBP = dst;
            break;
        case 0x6:       // SI
            this.regESI = dst;
            break;
        case 0x7:       // DI
            this.regEDI = dst;
            break;
        default:
            break;      // there IS no other case, but JavaScript inspections don't know that
        }
        this.nStepCycles -= this.CYCLES.nOpCyclesXchgRR;
    } else {
        /*
         * This is a case where the ModRM decoder that's calling us didn't know it should have called modEAWord()
         * instead of getEAWord(), so we compensate by updating regEAWrite.  However, setEAWord() has since been
         * changed to revalidate the write using segEA:offEA, so updating regEAWrite here isn't strictly necessary.
         */
        this.regEAWrite = this.regEA;
        this.setEAWord(dst);
        this.nStepCycles -= this.CYCLES.nOpCyclesXchgRM;
    }
    return src;
};

/**
 * fnXORb(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnXORb = function XORb(dst, src)
{
    var b = dst ^ src;
    this.setLogicResult(b, X86.RESULT.BYTE);
    this.nStepCycles -= (this.regEAWrite === X86.ADDR_INVALID? (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesArithRR : this.CYCLES.nOpCyclesArithRM) : this.CYCLES.nOpCyclesArithMR);
    return b;
};

/**
 * fnXORw(dst, src)
 *
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnXORw = function XORw(dst, src)
{
    var w = dst ^ src;
    this.setLogicResult(w, X86.RESULT.WORD);
    this.nStepCycles -= (this.regEAWrite === X86.ADDR_INVALID? (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesArithRR : this.CYCLES.nOpCyclesArithRM) : this.CYCLES.nOpCyclesArithMR);
    return w;
};

/**
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnXORd = function XORd(dst, src)
{
    this.nStepCycles -= (this.regEAWrite === X86.ADDR_INVALID? (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesArithRR : this.CYCLES.nOpCyclesArithRM) : this.CYCLES.nOpCyclesArithMR);
    return this.setLogicResult(dst ^ src, X86.RESULT.DWORD);
};

/**
 * setRotateResult(result, carry, size)
 *
 * Used by all rotate instructions (RCL, RCR, ROL, ROR) to update CF and OF.
 *
 * NOTE: Although I've yet to find confirmation of this for the 8086/8088, OF is undefined on modern x86 CPUs
 * for shift counts > 1 (in fact, on modern CPUs, OF tends to be clear in those situations).  Since I set OF the
 * same way for all shift counts, my well-defined behavior may or may not match the 8086/8088, but until I see a
 * defined behavior (or more importantly, some dependency on a different behavior), this seems good enough.
 *
 * @this {X86CPU}
 * @param {number} result
 * @param {number} carry
 * @param {number} size
 */
X86.setRotateResult = function(result, carry, size)
{
    if (carry & size) this.setCF(); else this.clearCF();
    if ((result ^ carry) & size) this.setOF(); else this.clearOF();
};

/**
 * @this {X86CPU}
 * @return {number}
 */
X86.fnGRPCount1 = function() {
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? 2 : this.CYCLES.nOpCyclesShift1M);
    return 1;
};

/**
 * @this {X86CPU}
 * @return {number}
 */
X86.fnGRPCountCL = function() {
    var count = this.regECX & this.nShiftCountMask;
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesShiftCR : this.CYCLES.nOpCyclesShiftCM) + (count << this.CYCLES.nOpCyclesShiftCS);
    return count;
};

/**
 * @this {X86CPU}
 * @return {number}
 */
X86.fnGRPCountImm = function() {
    var count = this.getIPByte();
    this.nStepCycles -= (this.regEA === X86.ADDR_INVALID? this.CYCLES.nOpCyclesShiftCR : this.CYCLES.nOpCyclesShiftCM) + (count << this.CYCLES.nOpCyclesShiftCS);
    return count;
};

/**
 * @this {X86CPU}
 * @return {number|null}
 */
X86.fnGRPSrcNone = function() {
    return null;
};

/**
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnGRPFault = function(dst, src)
{
    X86.fnFault.call(this, X86.EXCEPTION.GP_FAULT, 0);
    return dst;
};

/**
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnGRPInvalid = function(dst, src)
{
    X86.opInvalid.call(this);
    return dst;
};

/**
 * @this {X86CPU}
 * @param {number} dst
 * @param {number} src
 * @return {number}
 */
X86.fnGRPUndefined = function(dst, src)
{
    X86.opUndefined.call(this);
    return dst;
};

/**
 * fnDIVOverflow()
 *
 * @this {X86CPU}
 */
X86.fnDIVOverflow = function()
{
    this.setIP(this.opLIP - this.segCS.base);
    /*
     * TODO: Determine the proper cycle cost.
     */
    X86.fnINT.call(this, X86.EXCEPTION.DIV_ERR, null, 2);
};

/**
 * fnFault(nFault, nError, fHalt)
 *
 * Helper to dispatch faults.
 *
 * @this {X86CPU}
 * @param {number} nFault
 * @param {number} [nError]
 * @param {boolean} [fHalt] will halt the CPU if true *and* a Debugger is loaded
 */
X86.fnFault = function(nFault, nError, fHalt)
{
    if (!this.aFlags.fComplete) {
        this.printMessage("Fault " + str.toHexByte(nFault) + " blocked by Debugger", Messages.WARN);
        this.setIP(this.opLIP - this.segCS.base);
        return;
    }

    var fDispatch = false;
    if (this.model >= X86.MODEL_80186) {
        if (this.nFault < 0) {
            /*
             * Single-fault (error code is passed through, and the responsible instruction is restartable)
             */
            this.setIP(this.opLIP - this.segCS.base);
            fDispatch = true;
        } else if (this.nFault != X86.EXCEPTION.DF_FAULT) {
            /*
             * Double-fault (error code is always zero, and the responsible instruction is not restartable)
             */
            nError = 0;
            nFault = X86.EXCEPTION.DF_FAULT;
            fDispatch = true;
        } else {
            /*
             * Triple-fault (usually referred to in Intel literature as a "shutdown", but at least on the 80286,
             * it's actually a "reset")
             */
            X86.fnFaultMessage.call(this, -1, 0, fHalt);
            this.resetRegs();
            return;
        }
    }

    if (X86.fnFaultMessage.call(this, nFault, nError, fHalt)) {
        fDispatch = false;
    }

    if (fDispatch) X86.fnINT.call(this, this.nFault = nFault, nError, 0);

    /*
     * Since this fault is likely being issued in the context of an instruction that hasn't finished
     * executing, and since we currently don't do anything to interrupt that execution (eg, throw a
     * JavaScript exception), we should shut off all further reads/writes for the current instruction.
     *
     * That's easy for any EA-based memory accesses: simply set both the NOREAD and NOWRITE flags.
     * However, there are also direct, non-EA-based memory accesses to consider.  A perfect example is
     * opPUSHA(): if a GP fault occurs on any PUSH other than the last, a subsequent PUSH is likely to
     * cause another fault, which we will misinterpret as a double-fault.
     *
     * TODO: Throw a special JavaScript exception that cpu.js must intercept and quietly ignore.
     */
    this.opFlags &= ~(X86.OPFLAG.NOREAD | X86.OPFLAG.NOWRITE);
};

/**
 * fnFaultMessage()
 *
 * Aside from giving the Debugger an opportunity to report every fault, this also gives us the ability to
 * halt exception processing in tracks: return true to prevent the fault handler from being dispatched.
 *
 * At the moment, the only Debugger control you have over fault interception is setting MESSAGE.FAULT, which
 * will display faults as they occur, and MESSAGE.HALT, which will halt after any Debugger message, including
 * MESSAGE.FAULT.  If you want execution to continue after halting, clear MESSAGE.FAULT and/or MESSAGE.HALT,
 * or single-step over the offending instruction, which will allow the fault to be dispatched.
 *
 * @this {X86CPU}
 * @param {number} nFault
 * @param {number} [nError]
 * @param {boolean} [fHalt] true if the CPU should always be halted, false if "it depends"
 * @return {boolean|undefined} true to block the fault (often desirable when fHalt is true), otherwise dispatch it
 */
X86.fnFaultMessage = function(nFault, nError, fHalt)
{
    var bitsMessage = Messages.FAULT;
    var bOpcode = this.bus.getByteDirect(this.regLIP);

    /*
     * OS/2 1.0 uses an INT3 (0xCC) opcode in conjunction with an invalid IDT to trigger a triple-fault
     * reset and return to real-mode, and these resets happen quite frequently during boot; for example,
     * OS/2 startup messages are displayed using a series of INT 0x10 BIOS calls for each character, and
     * each series of BIOS calls requires a round-trip mode switch.
     *
     * Since we really only want to halt on "bad" faults, not "good" (ie, intentional) faults, we take
     * advantage of the fact that all 3 faults comprising the triple-fault point to an INT3 (0xCC) opcode,
     * and so whenever we see that opcode, we ignore the caller's fHalt flag, and suppress FAULT messages
     * unless CPU messages are also enabled.
     *
     * When a triple fault shows up, nFault is -1; it displays as "ff" because we display nFault as a byte.
     */
    if (bOpcode == X86.OPCODE.INT3) {
        fHalt = false;
        bitsMessage |= Messages.CPU;
    }

    /*
     * Similarly, the PC AT ROM BIOS deliberately generates a couple of GP faults as part of the POST
     * (Power-On Self Test); we don't want to ignore those, but we don't want to halt on them either.  We
     * detect those faults by virtue of the LIP being in the range %0F0000 to %0FFFFF.
     */
    if (this.regLIP >= 0x0F0000 && this.regLIP <= 0x0FFFFF) {
        fHalt = false;
    }

    /*
     * However, the foregoing notwithstanding, if MESSAGE.HALT is enabled along with all the other required
     * MESSAGE bits, then we want to halt regardless.
     */
    if (this.messageEnabled(bitsMessage | Messages.HALT)) {
        fHalt = true;
    }

    if (this.messageEnabled(bitsMessage) || fHalt) {
        var sMessage = (fHalt? '\n' : '') + "Fault " + str.toHexByte(nFault) + (nError != null? " (" + str.toHexWord(nError) + ")" : "") + " on opcode 0x" + str.toHexByte(bOpcode) + " at " + this.dbg.hexOffset(this.getIP(), this.getCS()) + " (%" + str.toHex(this.regLIP, 6) + ")";
        var fRunning = this.aFlags.fRunning;
        if (this.printMessage(sMessage, bitsMessage)) {
            if (fHalt) {
                /*
                 * By setting fHalt to fRunning (which is true while running but false while single-stepping),
                 * this allows a fault to be dispatched when you single-step over a faulting instruction; you can
                 * then continue single-stepping into the fault handler, or start running again.
                 *
                 * Note that we had to capture fRunning before calling printMessage(), because if MESSAGE.HALT
                 * is set, printMessage() will have already halted the CPU.
                 */
                fHalt = fRunning;
                this.dbg.stopCPU();
            }
        } else {
            /*
             * If printMessage() returned false, then messageEnabled() must have returned false as well, which
             * means that fHalt must be true.  Which means we should shut the machine down.
             */
            this.assert(fHalt);
            this.notice(sMessage);
            this.stopCPU();
        }
    }
    return fHalt;
};